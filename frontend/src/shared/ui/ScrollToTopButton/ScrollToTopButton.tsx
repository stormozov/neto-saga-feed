import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { Button } from "../Button";
import "./ScrollToTopButton.scss";

/**
 * Компонент кнопки прокрутки к началу страницы.
 *
 * Отображает кнопку, которая появляется при прокрутке страницы ниже
 * определённого порога (1200px). При клике плавно прокручивает страницу
 * к верху.
 */
function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = useCallback(() => {
		return setIsVisible(window.scrollY > 1200);
	}, []);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, [toggleVisibility]);

	return (
		<Button
			className={classNames("scroll-to-top-button", { visible: isVisible })}
			importance="secondary"
			aria-label="Наверх"
			title="Наверх"
			iconOnly
			onClick={scrollToTop}
		>
			<FiArrowUp size={20} />
		</Button>
	);
}

export default ScrollToTopButton;
