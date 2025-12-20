import { MONTHS_SHORT } from "@shared/constants";

/**
 * Получает текущий год
 */
export const getCurrentYear = () => new Date().getFullYear();

/**
 * Преобразует Unix-время (секунды) в отформатированную строку вида 
 * "12 янв, 14:35"
 *
 * @param {number} unixTimestamp - Unix-время в секундах (например, 1565887673)
 * @returns {string} Отформатированная строка с датой и временем
 *
 * @example
 * formatUnixTime(1565887673); // "12 янв, 14:35"
 */
export function formatUnixTime(unixTimestamp: number): string {
	const date = new Date(unixTimestamp * 1000);

	const day = date.getDate();
	const month = MONTHS_SHORT[date.getMonth()];
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${day} ${month}, ${hours}:${minutes}`;
}
