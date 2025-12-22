import { getLastItemId } from "@shared/utils";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
	fetchInitNewsRequested,
	fetchMoreNewsRequested,
	LoadMoreBtn,
	PostItemSkeleton,
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

	const handleLoadMore = useCallback(() => {
		if (posts.length > 0 && hasMore && !isLoading) {
			const lastPostId = getLastItemId(posts);
			if (!lastPostId) return;
			dispatch(fetchMoreNewsRequested(lastPostId));
		}
	}, [dispatch, posts, hasMore, isLoading]);

	return (
		<div className={styles.homepage}>
			<div className={styles.container}>
				<h1 className={styles.title}>Лента новостей</h1>

				{isInitialLoading && <PostItemSkeleton count={3} />}

				{!isInitialLoading && posts.length > 0 && (
					<>
						<PostsList posts={posts} />
						{hasMore && (
							<LoadMoreBtn onClick={handleLoadMore} isLoading={isLoading} />
						)}
					</>
				)}

				{!isInitialLoading && posts.length === 0 && (
					<p className={styles.text}>Новые новости отсутствуют</p>
				)}
			</div>
		</div>
	);
}
