import { Button } from "@shared/ui";
import { formatUnixTime, formatViews } from "@shared/utils";
import classNames from "classnames";
import Linkify from "linkify-react";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { TbShare3 } from "react-icons/tb";
import type { AttachmentType, IVKPost } from "@/features/NewsFeed";
import styles from "./PostItem.module.scss";
import { PostLinkAttachment } from "./PostLinkAttachment";
import { PostPhotoAttachment } from "./PostPhotoAttachment";

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
	const linkifyOptions = {
		attributes: {
			target: "_blank",
			rel: "noopener noreferrer",
		},
	};

	const likesCount = data.likes.count > 0 ? data.likes.count : "";
	const commentsCount = data.comments.count > 0 ? data.comments.count : "";
	const attachments = data.attachments;

	const avatars = [
		"./img/avatars/avatar-1.jpeg",
		"./img/avatars/avatar-2.jpeg",
		"./img/avatars/avatar-3.jpeg",
	];

	const getStableAvatar = (postId: number): string => {
		const index = Math.abs(postId) % avatars.length;
		return avatars[index];
	};

	const renderAttachment = (data: AttachmentType) => {
		switch (data.type) {
			case "link":
				return <PostLinkAttachment data={data.link} />;
			case "photo":
				return <PostPhotoAttachment data={data.photo} />;
			default:
				return null;
		}
	};

	return (
		<li className={styles["post-item"]}>
			<header className={styles["post-item__header"]}>
				<div className={styles["post-item__avatar"]}>
					<img src={getStableAvatar(data.id)} alt="Аватар пользователя" />
				</div>
				<div className={styles["post-item__header-wrapper"]}>
					<h4 className={styles["post-item__author"]}>Автор поста</h4>
					<time className={styles["post-item__date"]}>
						{formatUnixTime(data.date)}
					</time>
				</div>
			</header>

			<div className={styles["post-item__content"]}>
				<p className={styles["post-item__text"]}>
					<Linkify options={linkifyOptions}>{data.text}</Linkify>
				</p>
				{attachments && attachments.length > 0 && (
					<div className={styles["post-item__attachments"]}>
						{attachments.map((attachment) => (
							<div
								key={attachment.type}
								className={styles["post-item__attachment-item"]}
							>
								{renderAttachment(attachment)}
							</div>
						))}
					</div>
				)}
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
