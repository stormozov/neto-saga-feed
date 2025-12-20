import { Button, LoadingSpinner } from "@shared/ui";
import styles from "./LoadMoreBtn.module.scss";

/**
 * Интерфейс, описывающий свойств компонента {@link LoadMoreBtn}.
 *
 * Определяет обязательные свойства, передаваемые в компонент `LoadMoreBtn`.
 */
interface ILoadMoreBtnProps {
	/**
	 * Обработчик события клика.
	 *
	 * Вызывается при нажатии на кнопку, если она не находится в состоянии
	 * загрузки. Используется для инициации загрузки дополнительных данных.
	 *
	 * @example
	 * const handleClick = () => {
	 *   console.log('Загрузка предыдущих новостей');
	 * };
	 */
	onClick: () => void;

	/**
	 * Флаг состояния загрузки.
	 *
	 * Определяет, активна ли в данный момент загрузка данных.
	 * Если значение `true`, кнопка будет отключена, и будет отображён спиннер
	 * загрузки.
	 *
	 * @default false
	 *
	 * @example
	 * <LoadMoreBtn onClick={handleClick} isLoading={isPending} />
	 */
	isLoading: boolean;
}

/**
 * Компонент кнопки "Загрузить ещё".
 *
 * Отображает кнопку, которая позволяет пользователю загружать дополнительные 
 * данные (например, предыдущие новости). При активной загрузке отображается 
 * индикатор загрузки вместо текста.
 *
 * @example
 * <LoadMoreBtn onClick={handleLoadMore} isLoading={false} />
 */
function LoadMoreBtn({ onClick, isLoading }: ILoadMoreBtnProps) {
	return (
		<Button
			className={styles["load-more-btn"]}
			importance="secondary"
			disabled={isLoading}
			onClick={onClick}
		>
			{isLoading ? <LoadingSpinner /> : "к предыдущим новостям"}
		</Button>
	);
}

export default LoadMoreBtn;
