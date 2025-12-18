import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

// Создание саги
const sagaMiddleware = createSagaMiddleware();

/**
 * Конфигурация хранилища Redux.
 */
export const store = configureStore({
	reducer: {},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Запуск корневой саги
sagaMiddleware.run(rootSaga);

// Типы для использования в TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
