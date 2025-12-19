import { createSlice } from "@reduxjs/toolkit";
import type {
  FetchMoreNewsAction,
  FetchNewsFailedAction,
  FetchNewsSuccessAction,
  INewsFeedState,
} from "./types/reduxTypes";

/** Инициализация состояния слайса */
const initialState: INewsFeedState = {
	posts: [],
	isLoading: false,
	error: null,
	hasMore: true,
	isInitialLoading: true,
};

/**
 * Слайс Redux для управления состоянием ленты новостей.
 *
 * Содержит логику обработки загрузки первой и последующих порций новостей,
 * поддерживает состояние загрузки, ошибок и пагинации.
 */
const newsFeedSlice = createSlice({
  name: "newsFeed",
  initialState,
  reducers: {
    /**
     * Действие: начало загрузки первоначальной порции новостей.
     *
     * Устанавливает флаг `isLoading` в `true` и сбрасывает предыдущую ошибку.
     * Также используется для индикации начальной загрузки.
     *
     * @param state - Текущее состояние ленты новостей.
     */
    fetchInitNewsRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    /**
     * Действие: начало загрузки следующей порции новостей.
     *
     * Устанавливает флаг `isLoading` в `true` и сбрасывает ошибку.
     * Полезная нагрузка не используется, поэтому параметр проигнорирован.
     *
     * @param state - Текущее состояние ленты новостей.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchMoreNewsRequested: (state, _action: FetchMoreNewsAction) => {
      state.isLoading = true;
      state.error = null;
    },

    /**
     * Действие: успешная загрузка новостей (первой или последующей порции).
     *
     * В зависимости от флага `isInitial`:
     * - При первой загрузке (`isInitial = true`) — заменяет весь список новостей.
     * - При дозагрузке (`isInitial = false`) — добавляет новости в конец 
		 * действующего списка.
     *
     * Также определяет, есть ли ещё новости для загрузки, на основе количества 
		 * полученных элементов.
     *
     * @param state - Текущее состояние ленты новостей.
     * @param action - Действие с полезной нагрузкой, содержащей `posts` и флаг 
		 * `isInitial`.
     */
    fetchNewsSuccess: (state, action: FetchNewsSuccessAction) => {
      const { posts, isInitial } = action.payload;

      if (isInitial) {
        // Первая загрузка — заменяем все новости
        state.posts = posts;
        state.isInitialLoading = false;
      } else {
        // Дозагрузка — добавляем в конец массива
        state.posts.push(...posts);
      }

      state.isLoading = false;
      // Если получено меньше 5 новостей — значит, больше нет
      state.hasMore = posts.length === 5;
    },

    /**
     * Действие: ошибка при загрузке новостей.
     *
     * Сохраняет сообщение об ошибке, устанавливает `isLoading` в `false`
     * и отключает индикатор начальной загрузки.
     *
     * @param state - Текущее состояние ленты новостей.
     * @param action - Действие с полезной нагрузкой типа `string` — сообщением 
		 * об ошибке.
     */
    fetchNewsFailed: (state, action: FetchNewsFailedAction) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isInitialLoading = false;
    },
  },
});

// Экспорт действий
export const {
	fetchInitNewsRequested,
	fetchMoreNewsRequested,
	fetchNewsSuccess,
	fetchNewsFailed,
} = newsFeedSlice.actions;

// Экспорт редьюсера
export default newsFeedSlice.reducer;
