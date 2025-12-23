import { call, delay, put, takeLatest, takeLeading } from "redux-saga/effects";
import {
	fetchInitNewsRequested,
	fetchMoreNewsRequested,
	fetchNewsFailed,
	fetchNewsSuccess,
} from "./newsFeedSlice";
import type { VKPostsType } from "./types/postTypes";
import type { FetchNewsAction } from "./types/reduxTypes";

const URL: string = import.meta.env.VITE_API_BASE_URL;

/**
 * Сага для загрузки новостей с сервера с поддержкой пагинации.
 *
 * Выполняет HTTP-запрос на получение новостей. Если передан `lastSeenId`, 
 * запрашивает следующую порцию. В случае ошибки — повторяет запрос каждые 
 * 3 секунды до успешного выполнения.
 *
 * @param action - Действие, содержащее `lastSeenId` (идентификатор последней 
 * просмотренной новости). Если `undefined` — загружается начальная порция.
 *
 * @yields {Object} - Действие с полезной нагрузкой, содержащее `posts` 
 * и флаг `isInitial`.
 *
 * @example
 * // Запускается при:
 * yield takeLatest(FETCH_INIT_NEWS_REQUESTED, fetchNewsSaga);
 * yield takeLatest(FETCH_MORE_NEWS_REQUESTED, fetchNewsSaga);
 */
function* fetchNewsSaga(action: FetchNewsAction) {
	const lastSeenId = action.payload;
	const isInitial = lastSeenId === undefined;

	while (true) {
		try {
			const url = lastSeenId ? `${URL}?lastSeenId=${lastSeenId}` : URL;

			const response: Response = yield call(fetch, url);

			if (!response.ok) throw new Error(response.statusText);

			const posts: VKPostsType = yield response.json();

			yield put(fetchNewsSuccess({ posts, isInitial }));
			break;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";

			yield put(fetchNewsFailed(errorMessage));
			yield delay(3000);
		}
	}
}

/**
 * Сага-наблюдатель (watcher) для обработки действий, связанных с загрузкой 
 * новостей.
 *
 * Отслеживает два типа действий:
 * - {@link fetchInitNewsRequested} — для начальной загрузки новостей.
 * - {@link fetchMoreNewsRequested} — для подгрузки следующих порций.
 *
 * Использует разные стратегии контроля потока:
 * - `takeLeading` для начальной загрузки — обрабатывает только первый запрос, 
 * если предыдущий ещё не завершился.
 * - `takeLatest` для дозагрузки — отменяет предыдущий запрос, если был 
 * отправлен новый.
 *
 * @yields {Object} - Эффекты `takeLeading` и `takeLatest`, запускающие 
 * {@link fetchNewsSaga}.
 *
 * @example
 * // Подключается в корневой саге:
 * yield all([watchNewsFeed()]);
 */
export function* watchNewsFeed() {
	// takeLeading для первой загрузки - предотвращает дублирующие запросы
	yield takeLeading(fetchInitNewsRequested.type, fetchNewsSaga);
	// takeLatest для дозагрузки - отменяет предыдущие запросы дозагрузки
	yield takeLatest(fetchMoreNewsRequested.type, fetchNewsSaga);
}
