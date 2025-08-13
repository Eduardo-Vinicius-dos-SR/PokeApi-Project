import styled from "styled-components";
import { Fetch } from "../Fetch";
import { Card } from "../Card/Card";

const Div = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	@media (min-width: 1440px) {
		max-width: 82%;
	}
	div {
		max-width: 768px;
		display: flex;
		flex-direction: column;
		gap: 15px;
		margin: 0 auto;
		text-align: center;
		padding: 0 20px;
	}
`;

const Ul = styled.ul`
	max-width: 100%;
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(auto-fit, minmax(250px, 325px));
	gap: 25px;
	margin: 40px 50px;
	text-align: center;

	@media (max-width: 1060px) {
		gap: 20px;
		margin: 25px 0;
	}
	@media (max-width: 768px) {
		grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
		gap: 15px;
		margin: 20px 0;
	}

	@media (min-width: 1440px) {
		gap: 30px;
		margin: 40px auto;
	}
`;

export function Home() {
	return (
		<Div>
			<div>
				<h1>Welcome!</h1>
				<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>

				<p>
					{" "}
					Esse, quidem. Perspiciatis ipsa dolorum sequi quasi quidem qui recusandae odio. Laborum, quis consequuntur
					fugit molestiae iste laboriosam dolorem! Ducimus, maiores exercitationem?
				</p>
				<p>
					{" "}
					Esse, quidem. Perspiciatis ipsa dolorum sequi quasi quidem qui recusandae odio. Laborum, quis consequuntur
					fugit molestiae iste laboriosam dolorem! Ducimus, maiores exercitationem?
				</p>
			</div>

			<Fetch wanted="pokemon">
				{({ things }) => (
					<Ul>
						{things.length > 0 &&
							things.map((thing, idx) => <Card thing={thing} whatIs="pokemon" key={thing.id || idx} />)}
					</Ul>
				)}
			</Fetch>
		</Div>
	);
}
