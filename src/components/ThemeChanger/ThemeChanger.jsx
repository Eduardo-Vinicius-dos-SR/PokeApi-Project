import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../services/context/ThemeContext";
import styled from "styled-components";

import lightImg from "../../assets/img/icon-moon.svg";
import darkImg from "../../assets/img/icon-sun.svg";

const Button = styled.button`
	max-height: 70px;
	max-width: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 7px;
	border-radius: 12px;
	padding: 10px 12px;
	transition: 0.3s ease-in-out;

	&:active {
		scale: 0.95;
	}

	img {
		min-width: 100%;
		margin: 2px 0;
	}
	@media (max-width: 768px) {
		max-height: 50px;
		max-width: 50px;
		padding: 10px 13px;
	}
`;

export function ThemeButton() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	const [imgTheme, setImgTheme] = useState(darkImg);

	useEffect(() => {
		theme === "light" ? setImgTheme(lightImg) : setImgTheme(darkImg);
	}, [theme]);

	return (
		<Button onClick={toggleTheme}>
			<img src={imgTheme} alt="Theme image" />
		</Button>
	);
}
