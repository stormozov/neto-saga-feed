import type { IVKPost, VKPostsType } from "@/features/NewsFeed";
import { PostItem } from "../PostItem";
import styles from "./PostsList.module.scss";

/**
 * Интерфейс свойств компонента списка постов.
 *
 * Определяет структуру пропсов, передаваемых в компонент `PostsList`.
 */
interface IPostsListProps {
	/**
	 * Массив постов для отображения.
	 *
	 * Содержит список постов, каждый из которых должен соответствовать
	 * типу {@link VKPostsType}. Обычно представляет собой массив объектов,
	 * содержащих данные о постах из VK API.
	 */
	posts: VKPostsType;
}

/**
 * Компонент списка постов.
 *
 * Отображает список постов в виде неупорядоченного списка (`<ul>`), где каждый 
 * элемент списка представлен компонентом {@link PostItem}.
 *
 * @example
 * <PostsList posts={postsData} />
 */
export default function PostsList({ posts }: IPostsListProps) {
	return (
		<ul className={styles["posts-list"]}>
			{posts.map((post: IVKPost) => (
				<PostItem key={post.id} data={post} />
			))}
		</ul>
	);
}
