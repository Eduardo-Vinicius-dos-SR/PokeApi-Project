import styled from "styled-components";
import { Fetch } from "../Fetch";
import { Card } from "../Card/Card";

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
export function Berrys() {
	return (
		<Fetch wanted="berry" limit="12" howMuchFetch={2} loadingTime={300}>
			{({ things }) => (
				<Ul>
					{things.map((thing, idx) => {
						return <Card thing={thing} whatIs="berry" key={thing.id || idx} />;
					})}
				</Ul>
			)}
		</Fetch>
	);
}
