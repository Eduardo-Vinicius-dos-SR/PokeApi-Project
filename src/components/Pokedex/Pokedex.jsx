import styled from "styled-components";

const Div = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	@media (min-width: 1440px) {
		max-width: 82%;
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

import { Card } from "../Card/Card";
import { Fetch } from "../Fetch";

export function Pokedex() {
	return (
		<Div>
			<Fetch wanted="pokemon" howMuchFetch={2}>
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
