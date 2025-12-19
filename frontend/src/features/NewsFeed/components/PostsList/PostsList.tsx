import { Button } from "@/shared/ui";
import type { IVKPost, VKPostsType } from "../../types/postTypes";
import { PostItem } from "../PostItem";
import styles from "./PostsList.module.scss";

interface IPostsListProps {
	posts: VKPostsType;
	hasMore: boolean;
}

export default function PostsList({ posts, hasMore }: IPostsListProps) {
	return (
		<ul className={styles["posts-list"]}>
			{posts.map((post: IVKPost) => (
				<PostItem key={post.id} data={post} />
			))}
			{hasMore && (
				<li className={styles["more-item"]}>
					<Button className={styles["more-item__button"]}>Загрузить ещё</Button>
				</li>
			)}
		</ul>
	);
}
