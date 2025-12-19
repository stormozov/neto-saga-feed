import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { newsFeedReducer } from "@/features/NewsFeed";
import rootSaga from "./rootSaga";

// Создание саги
const sagaMiddleware = createSagaMiddleware();

// Создание стора с помощью Redux Toolkit
export const store = configureStore({
	reducer: {
		newsFeed: newsFeedReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Запуск корневой саги
sagaMiddleware.run(rootSaga);
