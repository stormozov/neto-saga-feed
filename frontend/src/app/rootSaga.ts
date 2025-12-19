import { all } from "redux-saga/effects";
import { watchNewsFeed } from "@/features/NewsFeed";

/**
 * Корневая сага приложения.
 *
 * Объединяет все отдельные саги в один поток с помощью `all`, чтобы запустить
 * их одновременно при инициализации приложения. Используется как точка входа
 * для управления всеми асинхронными процессами через `redux-saga`.
 *
 * @yields {Array} - Массив саг, запускаемых параллельно.
 *
 * @example
 * ```ts
 * // В настройке стора:
 * sagaMiddleware.run(rootSaga);
 * ```
 */
export default function* rootSaga() {
	yield all([watchNewsFeed()]);
}
