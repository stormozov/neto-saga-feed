import type { RootState } from "@/app/types";
import type { VKPostsType } from "./types/postTypes";

/**
 * Селектор: возвращает текущий список новостей.
 *
 * @param state - Корневое состояние Redux.
 * @returns Массив новостей.
 */
export const selectNewsFeedPosts = (state: RootState): VKPostsType =>
	state.newsFeed.posts;

/**
 * Селектор: возвращает статус загрузки.
 *
 * Используется для отображения индикатора загрузки при первой загрузке или 
 * подгрузке новых новостей.
 *
 * @param state - Корневое состояние Redux.
 * @returns `true`, если идёт загрузка, иначе `false`.
 */
export const selectNewsFeedLoadingStatus = (state: RootState): boolean =>
  state.newsFeed.isLoading;

/**
 * Селектор: возвращает сообщение об ошибке, если загрузка новостей не удалась.
 *
 * @param state - Корневое состояние Redux.
 * @returns Сообщение об ошибке или `null`, если ошибки нет.
 */
export const selectNewsFeedError = (state: RootState): string | null =>
  state.newsFeed.error;

/**
 * Селектор: возвращает признак наличия дополнительных новостей для загрузки.
 *
 * Определяется на основе количества полученных новостей (например, если меньше 
 * 5 — больше нет).
 *
 * @param state - Корневое состояние Redux.
 * @returns `true`, если есть ещё новости, иначе `false`.
 */
export const selectNewsFeedHasMore = (state: RootState): boolean =>
  state.newsFeed.hasMore;

/**
 * Селектор: возвращает признак начальной загрузки приложения.
 *
 * Отличается от `isLoading` тем, что указывает именно на первую загрузку,
 * и может использоваться для отображения начального экрана.
 *
 * @param state - Корневое состояние Redux.
 * @returns `true`, если идёт первоначальная загрузка, иначе `false`.
 */
export const selectNewsFeedIsInitialLoading = (state: RootState): boolean =>
  state.newsFeed.isInitialLoading;

/**
 * Селектор: возвращает количество новостей в текущей ленте.
 *
 * Используется для отображения счётчика или аналитики.
 *
 * @param state - Корневое состояние Redux.
 * @returns Количество новостей в массиве `posts`.
 */
export const selectNewsFeedPostsCount = (state: RootState): number =>
  state.newsFeed.posts.length;
