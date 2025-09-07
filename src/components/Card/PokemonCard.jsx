import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { customFetch } from "../../services/fetch";
import { Card } from "./Card";
import styled from "styled-components";

const PokeCard = styled.div`
	position: relative;
	min-height: 100%;
	width: 100%;

	a {
		position: absolute;
		left: 10px;
		border-radius: 10px;
		padding: 7px 20px;
		background-color: rgba(0, 0, 0, 0.2);
		font-size: 1.5em;
		transition: 0.3s ease-in-out;
		z-index: 1;
	}
	a:hover {
		background-color: rgba(0, 0, 0, 0.4);
	}

	ul {
		margin: 30px 40px;
	}
`;

export function PokemonCard() {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		async function fetchPokemon() {
			try {
				const poke = await customFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
				setPokemon(await poke);
			} catch (err) {
				alert("Pokemon not found, try again");
				console.error(err);
			}
			return;
		}

		fetchPokemon();
	}, [id]);

	return (
		<PokeCard>
			<Link to="/pokedex">Back</Link>
			{pokemon && (
				<ul>
					<Card thing={pokemon} whatIs="pokemon" shortInformation={false} />
				</ul>
			)}
		</PokeCard>
	);
}
