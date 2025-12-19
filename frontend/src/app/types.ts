import type { store } from "./store";

/**
 * Тип состояния хранилища Redux.
 *
 * Представляет собой тип, автоматически выводимый из возвращаемого значения
 * метода `getState` хранилища. Используется для типизации корневого состояния
 * приложения в TypeScript, обеспечивая безопасность типов при работе
 * с состоянием.
 *
 * @example
 * const state: RootState = store.getState();
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип диспетчера действий Redux.
 *
 * Представляет тип функции `dispatch`, используемой для отправки действий
 * (actions) в хранилище Redux. Применяется для типизации параметров, где
 * ожидается dispatch, например, в создателях асинхронных действий или хуках.
 *
 * @example
 * const dispatch: AppDispatch = useAppDispatch();
 */
export type AppDispatch = typeof store.dispatch;
