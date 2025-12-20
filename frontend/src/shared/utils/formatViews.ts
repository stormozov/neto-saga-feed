/**
 * Форматирует число просмотров в сокращенную форму с суффиксами K, M, B
 * с одним знаком после точки при необходимости.
 *
 * @param {number} views - Количество просмотров (целое неотрицательное число)
 * @returns {string} Отформатированная строка (например: "1.5K", "2M", "150")
 *
 * @example
 * formatViews(1550); // "1.5K"
 * formatViews(2_000_000); // "2M"
 * formatViews(42); // "42"
 */
export function formatViews(views: number): string {
	if (views < 1000) return views.toString();

	const units = ["K", "M", "B"] as const;
	const thresholds = [1000, 1000000, 1000000000];

	for (let i = thresholds.length - 1; i >= 0; i--) {
		if (views >= thresholds[i]) {
			const value = views / thresholds[i];

			if (value < 10) {
				const formatted = Math.floor(value * 10) / 10;
				return `${formatted}${units[i]}`;
			}

			return `${Math.floor(value)}${units[i]}`;
		}
	}

	return views.toString();
}
