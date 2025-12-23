import type { ILinkAttachment } from "@/features/NewsFeed";
import styles from "./PostLinkAttachment.module.scss";

/**
 * Интерфейс, описывающий свойства компонента {@link PostLinkAttachment}.
 */
interface IPostLinkAttachmentProps {
	data: ILinkAttachment;
}

/**
 * Компонент вложения ссылки в посте.
 *
 * Отображает визуальное представление прикреплённой ссылки с заголовком 
 * и описанием. Включает изображение-заглушку (превью ссылки), заголовок 
 * (`title`) и подпись (`caption`). Используется внутри поста для отображения 
 * внешних ссылок.
 *
 * @example
 * <PostLinkAttachment data={{
 *   title: "Новости технологий",
 *   caption: "tech.example.com"
 * }} />
 */
export default function PostLinkAttachment(data: IPostLinkAttachmentProps) {
	const { title, caption } = data.data;

	return (
		<div className={styles["post-link-attachment"]}>
			<div className={styles["post-link-attachment__img-wrapper"]}>
				<img
					src="./img/no-photo.png"
					alt={title}
					className={styles["post-link-attachment__img"]}
				/>
			</div>
			<div className={styles["post-link-attachment__info"]}>
				<h4 className={styles["post-link-attachment__title"]}>{title}</h4>
				<p className={styles["post-link-attachment__caption"]}>{caption}</p>
			</div>
		</div>
	);
}
