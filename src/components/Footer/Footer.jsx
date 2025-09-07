import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import styled from "styled-components";

const Foot = styled.footer`
	max-height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-self: flex-end;
	gap: 20px;
	margin-top: auto;
	padding: 50px;
	background-color: rgba(19, 19, 23, 0.81);

	ul {
		display: flex;
		gap: 20px;
	}

	li a {
		transition: 0.3s ease-in-out;
		color: #fff;
	}

	a svg {
		font-size: 1.4em;
	}
	a:hover {
		color: rgba(29, 94, 141, 0.8);
	}

	p {
		color: rgba(255, 255, 255, 0.87);
		font-size: 1.1em;
	}
	p span {
		color: rgba(220, 62, 41, 1);
	}
`;

export function Footer() {
	return (
		<Foot>
			<ul>
				<li>
					<a href="#">
						<FaInstagram />
					</a>
				</li>
				<li>
					<a href="https://github.com/Eduardo-Vinicius-dos-SR" target="_blank">
						<FaGithub />
					</a>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/in/eduardo-vin%C3%ADcius-dos-santos-r-719955336/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BWU79DKSASDqCrsTXDI9lEg%3D%3D"
						target="_blank"
					>
						<FaLinkedin />
					</a>
				</li>
			</ul>
			<p>
				<span>Pokeapi</span> &copy; 2025
			</p>
		</Foot>
	);
}
