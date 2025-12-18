import { readFileSync } from "node:fs";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {
	findNewsIndex,
	fortune,
	getNewsBatch,
	parseLastSeenId,
} from "./utils.js";

const app = express();

app.use(cors());
app.use(
	bodyParser.json({
		type() {
			return true;
		},
	}),
);
app.use((_, res, next) => {
	res.setHeader("Content-Type", "application/json");
	next();
});

/** Массив новостей */
const news = JSON.parse(readFileSync("./data/news.json", "utf-8"));
/** Лимит новостей в 1 батч */
const limit = 5;

/**
 * Обработчик GET-запроса для получения порции новостей с пагинацией
 * по последнему просмотренному ID.
 *
 * Поддерживает бесконечную прокрутку: клиент передаёт `lastSeenId` —
 * идентификатор последней просмотренной новости, и сервер возвращает следующую
 * порцию.
 *
 * @param {Object} req - Объект запроса Express.
 * @param {Object} req.query - Параметры запроса.
 * @param {string} [req.query.lastSeenId] - Идентификатор последней
 * просмотренной новости. Если отсутствует — возвращается первая страница.
 * @param {Object} res - Объект ответа Express.
 *
 * @returns {Promise<void>} Асинхронный ответ с массивом новостей или ошибкой.
 *
 * @throws {400} Если `lastSeenId` передан, но не может быть распознан.
 * @throws {404} Если `lastSeenId` не найден среди новостей.
 * @throws {500} Если произошла внутренняя ошибка (имитация через `fortune`).
 *
 * @example
 * // Получение первой страницы:
 * GET /news
 *
 * @example
 * // Получение следующей порции после новости с ID 5:
 * GET /news?lastSeenId=5
 */
app.get("/api/news", async (req, res) => {
	const { lastSeenId } = req.query;

	// Парсинг ID; если передан, но некорректен — ошибка 400
	const id = parseLastSeenId(lastSeenId);
	if (id === null && lastSeenId !== undefined) {
		try {
			return await fortune(res, null, 400);
		} catch {
			return res.status(500).send("Something went wrong");
		}
	}

	let startIndex;
	if (id === null) {
		startIndex = 0;
	} else {
		const index = findNewsIndex(news, id);
		if (index === -1) {
			try {
				return await fortune(res, null, 404);
			} catch {
				return res.status(500).send("Something went wrong");
			}
		}
		startIndex = index + 1;
	}

	// Получаем порцию новостей для отправки
	const body = getNewsBatch(news, startIndex, limit);
	try {
		return await fortune(res, body);
	} catch {
		return res.status(500).send("Something went wrong");
	}
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on port ${port}.`));
