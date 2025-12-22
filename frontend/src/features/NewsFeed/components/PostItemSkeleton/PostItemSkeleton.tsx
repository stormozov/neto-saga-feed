import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import styles from "./PostItemSkeleton.module.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link PostItemSkeleton}.
 */
interface IPostItemSkeletonProps {
	/** Количество заглушек, которые нужно отобразить. */
	count: number;
}

/**
 * Компонент-заглушка (skeleton) для визуального отображения загрузки постов.
 *
 * Используется для создания индикатора загрузки в виде каркаса постов,
 * имитируя их структуру до момента получения реальных данных.
 * Позволяет отобразить заданное количество заглушек.
 *
 * @example
 * <PostItemSkeleton count={3} /> // отобразит три заглушки
 *
 * @example
 * <PostItemSkeleton /> // отобразит одну заглушку
 */
export default function PostItemSkeleton({
	count = 1,
}: IPostItemSkeletonProps) {
	const defaultElementSelector = styles["post-item-skeleton__element"];
	const defaultLineSelector = styles["post-item-skeleton__line"];
	const defaultCircleSelector = styles["post-item-skeleton__circle"];

	const smLineSelector = classNames(
		defaultElementSelector,
		defaultLineSelector,
		styles["post-item-skeleton__line-sm"],
	);
	const mdLineSelector = classNames(
		defaultElementSelector,
		defaultLineSelector,
		styles["post-item-skeleton__line-md"],
	);
	const fullLineSelector = classNames(
		defaultElementSelector,
		defaultLineSelector,
		styles["post-item-skeleton__line-full"],
	);

	const smCircleSelector = classNames(
		defaultElementSelector,
		defaultCircleSelector,
		styles["post-item-skeleton__circle-sm"],
	);
	const mdCircleSelector = classNames(
		defaultElementSelector,
		defaultCircleSelector,
		styles["post-item-skeleton__circle-md"],
	);

	return (
		<ul className={styles["posts-list-skeleton"]}>
			{Array.from({ length: count }, () => (
				<li
					key={`post-item-skeleton-${uuidv4()}`}
					className={styles["post-item-skeleton"]}
				>
					<header className={styles["post-item-skeleton__header"]}>
						<div className={mdCircleSelector}></div>
						<div className={styles["post-item-skeleton__header-wrapper"]}>
							<div className={mdLineSelector}></div>
							<div className={smLineSelector}></div>
						</div>
					</header>

					<div className={styles["post-item-skeleton__content"]}>
						<div className={fullLineSelector}></div>
						<div className={fullLineSelector}></div>
						<div className={fullLineSelector}></div>
						<div className={mdLineSelector}></div>
					</div>

					<footer className={styles["post-item-skeleton__footer"]}>
						<div className={styles["post-item-skeleton__actions"]}>
							<div className={smCircleSelector}></div>
							<div className={smCircleSelector}></div>
							<div className={smCircleSelector}></div>
						</div>

						<div
							className={classNames(
								styles["post-item-skeleton__action"],
								styles["post-item-skeleton__views"],
							)}
						>
							<div className={smLineSelector}></div>
						</div>
					</footer>
				</li>
			))}
		</ul>
	);
}
