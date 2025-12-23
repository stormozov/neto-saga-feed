import type { IPhotoAttachment } from "@/features/NewsFeed";
import styles from "./PostPhotoAttachment.module.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link PostPhotoAttachment}.
 */
interface IPostPhotoAttachmentProps {
	data: IPhotoAttachment;
}

/**
 * Компонент вложения с фотографией в посте.
 *
 * Отображает изображение, прикреплённое к посту. В текущей реализации
 * используется заглушка изображения. Альтернативный текст изображения
 * берётся из свойства `text` данных вложения.
 *
 * @example
 * <PostPhotoAttachment data={{ text: "Описание фотографии" }} />
 */
export default function PostPhotoAttachment(data: IPostPhotoAttachmentProps) {
	const { text } = data.data;

	return (
		<div className={styles["post-photo-attachment"]}>
			<div className={styles["post-photo-attachment__img-wrapper"]}>
				<img
					src="./img/no-photo.png"
					alt={text}
					className={styles["post-photo-attachment__img"]}
				/>
			</div>
		</div>
	);
}
