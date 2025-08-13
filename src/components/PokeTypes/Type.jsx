import { useEffect, useState } from "react";
import { customFetch } from "../../services/fetch";
import styled from "styled-components";

import { Card } from "../Card/Card";
import { Fetch } from "../Fetch";
import { LoadMore } from "../Load/Loadmore";

const Ul = styled.ul`
	max-width: 100%;
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(auto-fit, minmax(250px, 325px));
	gap: 30px;
	margin: 40px 60px;
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

export function Type({ type, allTypes }) {
	const [selectedPokemons, setSelectedPokemons] = useState([]);
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		const filteredType = allTypes.find((oneType) => oneType.name === type);

		if (!filteredType) {
			setSelectedPokemons([]);
			return;
		}

		setSelectedPokemons([]);
		setQuantity(0);
	}, [type, allTypes]);

	useEffect(() => {
		const filteredType = allTypes.find((oneType) => oneType.name === type);
		if (!filteredType) return;
		const pokemonsSlice = filteredType.pokemon.slice(quantity, quantity + 12);
		async function fetchAll() {
			const response = await Promise.all(pokemonsSlice.map((poke) => customFetch(poke.pokemon.url)));
			setSelectedPokemons((prev) => {
				const prevIds = new Set(prev.map((item) => item.id));
				const uniqueResults = response.filter((item) => !prevIds.has(item.id));
				return [...prev, ...uniqueResults];
			});
		}
		fetchAll();
	}, [type, allTypes, quantity]);

	return (
		<Fetch isFetchWanted={false} loadMoreRequired={false} howMuchFetch={2}>
			{() => (
				<>
					<Ul>
						{selectedPokemons.length > 0 &&
							selectedPokemons.map((pokemon) => <Card thing={pokemon} whatIs="pokemon" key={pokemon.id} />)}
					</Ul>
					<LoadMore quantity={quantity} setQuantity={setQuantity} />
				</>
			)}
		</Fetch>
	);
}
