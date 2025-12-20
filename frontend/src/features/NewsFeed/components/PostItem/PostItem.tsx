import { Button } from "@shared/ui";
import { formatUnixTime, formatViews } from "@shared/utils";
import classNames from "classnames";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { TbShare3 } from "react-icons/tb";
import type { IVKPost } from "../../types/postTypes";
import styles from "./PostItem.module.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link PostItem}.
 *
 * Определяет структуру пропсов, передаваемых в компонент `PostItem`.
 */
interface IPostItemProps {
	/**
	 * Данные поста.
	 *
	 * Объект, содержащий информацию о посте, включая текст, дату,
	 * количество лайков, комментариев и просмотров.
	 * Должен соответствовать интерфейсу `IVKPost`.
	 *
	 * @example
	 * <PostItem data={{
	 *   id: 27483,
	 *   from_id: -30159897,
	 *   text: "До запуска Education show осталось две недели. Уже 27 августа ...",
	 *   date: 1565887673,
	 *
	 * 	 ... другие поля
	 *
	 *   likes: { count: 5 },
	 *   comments: { count: 2 },
	 *   views: { count: 42 }
	 * }} />
	 */
	data: IVKPost;
}

/**
 * Компонент отдельного поста в ленте.
 *
 * Отображает информацию о посте: автора, дату, текст, количество лайков,
 * комментариев, просмотров и кнопки взаимодействия. Используется внутри
 * {@link PostsList} для рендеринга каждого элемента списка постов.
 *
 * @example
 * <PostItem data={post} />
 */
export default function PostItem({ data }: IPostItemProps) {
	const likesCount = data.likes.count > 0 ? data.likes.count : "";
	const commentsCount = data.comments.count > 0 ? data.comments.count : "";

	return (
		<li className={styles["post-item"]}>
			<header className={styles["post-item__header"]}>
				<div className={styles["post-item__avatar"]}>
					<img src="./avatar.jpeg" alt="Аватар пользователя" />
				</div>
				<div className={styles["post-item__header-wrapper"]}>
					<h4 className={styles["post-item__author"]}>Автор поста</h4>
					<time className={styles["post-item__date"]}>
						{formatUnixTime(data.date)}
					</time>
				</div>
			</header>

			<div className={styles["post-item__content"]}>
				<p className={styles["post-item__text"]}>{data.text}</p>
			</div>

			<footer className={styles["post-item__footer"]}>
				<div className={styles["post-item__actions"]}>
					<div
						className={classNames(
							styles["post-item__action"],
							styles["post-item__likes"],
						)}
					>
						<Button
							appearance="text"
							className={styles["post-item__like-button"]}
						>
							<MdFavoriteBorder />
						</Button>
						{likesCount && (
							<span
								className={classNames(
									styles["post-item__count"],
									styles["post-item__likes-count"],
								)}
							>
								{likesCount}
							</span>
						)}
					</div>

					<div
						className={classNames(
							styles["post-item__action"],
							styles["post-item__comments"],
						)}
					>
						<Button
							appearance="text"
							className={styles["post-item__comment-button"]}
						>
							<FaRegCommentAlt />
						</Button>
						{commentsCount && (
							<span
								className={classNames(
									styles["post-item__count"],
									styles["post-item__comments-count"],
								)}
							>
								{commentsCount}
							</span>
						)}
					</div>

					<div
						className={classNames(
							styles["post-item__action"],
							styles["post-item__reposts"],
						)}
					>
						<Button
							appearance="text"
							className={styles["post-item__repost-button"]}
						>
							<TbShare3 />
						</Button>
					</div>
				</div>

				<div
					className={classNames(
						styles["post-item__action"],
						styles["post-item__views"],
					)}
				>
					<IoEye />
					<span className={styles["post-item__views-count"]}>
						{formatViews(data.views.count)}
					</span>
				</div>
			</footer>
		</li>
	);
}
