import type { VKIDType } from "@/features/NewsFeed";

/**
 * Возвращает идентификатор последнего элемента в массиве.
 *
 * Полиморфная функция, принимающая массив объектов, каждый из которых
 * должен иметь свойство `id` типа {@link VKIDType}.
 * Если массив пуст, возвращает `null`.
 *
 * @template T - Тип элементов массива, должен иметь свойство `id` типа 
 * {@link VKIDType}.
 * @param {T[]} items - Массив объектов с идентификатором.
 * @returns {T["id"] | null} Идентификатор последнего элемента или `null`,
 * если массив пуст.
 *
 * @example
 * const items = [{ id: new VKID("123") }, { id: new VKID("456") }];
 * const lastId = getLastItemId(items); // VKID("456")
 *
 * @example
 * const empty: { id: VKIDType }[] = [];
 * const lastId = getLastItemId(empty); // null
 */
export const getLastItemId = <T extends { id: VKIDType }>(
	items: T[],
): T["id"] | null => {
	if (items.length === 0) return null;
	return items[items.length - 1].id;
};
