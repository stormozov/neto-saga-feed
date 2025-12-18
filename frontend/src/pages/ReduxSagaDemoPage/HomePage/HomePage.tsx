import styles from "./HomePage.module.scss";

/**
 * Главная страница приложения
 */
export default function HomePage() {
	return (
		<div className={styles.homepage}>
			<h1 className={styles.title}>Список услуг</h1>
		</div>
	);
}
