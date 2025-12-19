import { LoadingFallback } from "@shared/ui";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
	fetchInitNewsRequested,
	PostsList,
	selectNewsFeedHasMore,
	selectNewsFeedIsInitialLoading,
	selectNewsFeedLoadingStatus,
	selectNewsFeedPosts,
} from "@/features/NewsFeed";
import styles from "./HomePage.module.scss";

/**
 * Главная страница приложения
 */
export default function HomePage() {
	const dispatch = useAppDispatch();
	const posts = useAppSelector(selectNewsFeedPosts);
	const isLoading = useAppSelector(selectNewsFeedLoadingStatus);
	const hasMore = useAppSelector(selectNewsFeedHasMore);
	const isInitialLoading = useAppSelector(selectNewsFeedIsInitialLoading);

	useEffect(() => {
		if (isInitialLoading) dispatch(fetchInitNewsRequested());
	}, [dispatch, isInitialLoading]);

	return (
		<div className={styles.homepage}>
			<div className={styles.container}>
				<h1 className={styles.title}>Лента новостей</h1>

				{isLoading && <LoadingFallback />}

				{!isLoading && posts.length > 0 && (
					<PostsList posts={posts} hasMore={hasMore} />
				)}

				{!isLoading && posts.length === 0 && (
					<p className={styles.text}>Новые новости отсутствуют</p>
				)}
			</div>
		</div>
	);
}
