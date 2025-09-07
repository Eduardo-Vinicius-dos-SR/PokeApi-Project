import { Link } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import styled from "styled-components";
import { ThemeButton } from "../ThemeChanger/ThemeChanger";

const Nav = styled.nav`
	display: flex;
	padding: 15px;
	justify-content: space-between;
	align-items: center;
	background-color: rgba(59, 85, 99, 0.26);
	padding-left: 5px;

	.logo {
		max-height: 50px;
		margin: 0 20px;
	}

	.logo img {
		max-height: 50px;
		height: 100%;
		object-fit: contain;
	}

	ul {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		margin: 0 20px;
		padding: 15px;
		font-size: 20px;
		background-color: rgba(100, 100, 100, 0.2);
		border-radius: 20px;
		flex-wrap: wrap;
	}
	ul li {
		padding: 0 10px;
		font-size: 0.85em;
	}

	li a {
		color: #fff;
		transition: 0.2s ease-in-out;
	}
	li a:hover {
		color: rgb(255, 59, 59);
		text-decoration: underline;
	}
	li a:active {
		color: rgba(255, 59, 59, 0.5);
		scale: 0.95;
	}

	@media (max-width: 768px) {
		padding: 10px 10px 12px;

		.logo {
			margin: auto 10px;
		}
		.logo img {
			max-height: 40px;
		}

		ul {
			width: max-content;
			gap: 7px;
			margin: 0 10px;
			border-radius: 25px;
			font-size: 0.95em;
		}
	}

	@media (max-width: 350px) {
		ul {
			border-radius: 20px;
			padding: 10px 0;
		}

		ul li {
			padding: 0 10px;
			font-size: 0.8em;
		}
	}
`;

export function Navbar() {
	return (
		<Nav>
			<Link to="/" className="logo">
				<img src={Logo} alt="Home" />
			</Link>

			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/types">Types</Link>
				</li>
				<li>
					<Link to="/berrys">Berrys</Link>
				</li>
				<li>
					<Link to="/pokedex">Pokedex</Link>
				</li>
			</ul>

			<ThemeButton />
		</Nav>
	);
}
