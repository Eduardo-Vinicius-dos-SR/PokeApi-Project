import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UndefienedPokemon from "../../assets/img/UndefienedPokemon.png";
import { useEffect, useState } from "react";
import { customFetch } from "../../services/fetch";

const CardItem = styled.li`
	max-width: 100%;
	margin-top: 20px;

	audio {
		max-width: 100%;
		margin: 5px auto 10px;
	}

	img {
		transition: scale 0.2s;
		cursor: pointer;
		&:hover {
			scale: 0.95;
		}
	}

	/* --- Versão detalhada (long) --- */
	&.long {
		min-height: 500px;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		gap: 30px;
	}
	&.long img {
		min-width: 150px;
		max-width: 25%;
		width: 100%;
		margin-top: 20px;
		object-fit: cover;
	}
	&.long .informations {
		min-width: 200px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
		margin: 20px 20px;
	}
	&.long .informations h2 {
		width: 100%;
		margin-bottom: 7px;
		font-size: 2.2em;
		text-align: center;
	}
	&.long audio {
		scale: 1.1;
	}
	&.long .informations ul {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin: 0;
	}
	&.long .informations li p {
		font-size: 1.1em;
	}
	&.long .attacks {
		max-width: 400px;
		min-width: 180px;
		width: 30%;
		display: flex;
		padding: 20px;
	}
	&.long .attacks div {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	&.long .attacks h3 {
		font-size: 1.3em;
	}
	&.long .attacks details summary {
		font-size: 1.1em;
	}
	&.long .attacks details p {
		font-size: 1em;
	}

	/* --- Versão compacta (short) --- */
	&.short {
		min-height: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 2px solid #cccccc82;
		border-radius: 12px;
		padding: 16px 10px;
		background-color: #6a686892;
	}
	&.short img {
		max-height: 90px;
		margin: 5px 0;
		scale: 1.3;
		object-fit: cover;
	}
	&.short img[src="${UndefienedPokemon}"] {
		scale: 1.1;
	}
	&.short h2 {
		margin: 5px 0 7px;
	}
	&.short ul.informations {
		margin-right: auto;
		padding: 0 7px 10px;
		margin-top: 10px;
	}
	&.short li {
		text-align: left;
		padding: 3px 0;
	}
	&.short li p {
		display: block;
		overflow: hidden;
		white-space: wrap;
		text-overflow: ellipsis;
		font-size: 0.95em;
	}

	/* --- Berry --- */
	&.berry img {
		margin: 15px 0 25px;
		scale: 2;
  cursor: default;
	}

	/* --- Responsividade --- */
	@media (max-width: 768px) {
		&.long {
			gap: 15px;
		}
		&.long .informations {
			min-width: 120px;
			gap: 10px;
			margin: 10px 0;
		}
		&.long .informations h2 {
			font-size: 1.5em;
		}
		&.long .informations li p {
			font-size: 0.95em;
		}
		&.long .attacks div {
			gap: 7px;
		}
		&.long .attacks h3 {
			font-size: 1.1em;
		}
		&.long .attacks details summary {
			font-size: 1em;
		}
		&.long .attacks details p {
			font-size: 0.9em;
		}
		&.short {
			max-height: 350px;
			padding: 12px 7px;
		}
		&.short img {
			max-height: 70px;
			scale: 1.1;
		}
		&.short img[src="${UndefienedPokemon}"] {
			scale: 1;
		}
		&.short h2 {
			margin: 5px 0 3px;
			font-size: 1em;
		}
		&.short audio {
			scale: 0.8;
			margin: 0 auto;
		}
		&.short ul.informations {
			padding: 0 5px 10px;
			margin-top: 5px;
		}
		&.short li {
			padding: 2px 0;
		}
		&.short li p {
			font-size: 0.8em;
		}
	}
	@media (max-width: 500px) {
		&.long {
			gap: 0;
		}
		&.long img {
			min-width: 100px;
			max-height: 75%;
			margin-top: 20px;
		}
		&.long audio {
			min-width: 100%;
			scale: 1;
		}
		&.long .attacks {
			max-width: 100vw;
			width: 100%;
			margin-top: 10px;
		}
	}
`;

export function Card({ thing, whatIs, shortInformation = true }) {
	const navigate = useNavigate();

	const [moves, setMoves] = useState([]);

	useEffect(() => {
		if (!shortInformation) {
			async function fetchMoves() {
				const movesArray = Array.isArray(thing.moves) ? thing.moves.slice(0, 4) : [];

				if (movesArray.length === 0) {
					setMoves([]);
					return;
				}

				const movesName = movesArray.map((array) => array.move.name);
				const movesDetails = await Promise.all(movesArray.map((array) => customFetch(array.move.url))).then(
					(movesEffect) => movesEffect.map((move) => move.effect_entries[0]?.short_effect || "")
				);

				const movesObj = movesName.map((name, idx) => ({
					name,
					info: movesDetails[idx],
				}));
				setMoves(movesObj);
			}

			fetchMoves();
		}
	}, [shortInformation, thing]);

	if (whatIs == "pokemon") {
		if (shortInformation) {
			return (
				<CardItem key={thing.id} className="pokemon short">
					<img
						onClick={() => {
							navigate(`/pokedex/${thing.name}`);
						}}
						src={thing.sprites.front_default || UndefienedPokemon}
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = UndefienedPokemon;
						}}
						alt={`${thing.name} image`}
					/>
					<h2>{thing.name}</h2>
					<audio src={thing.cries.latest} preload="metadata" controls></audio>
					<ul className="informations">
						<li>
							<p>
								Abilities:
								{thing.abilities.length !== 1 ? (
									<>
										<strong> {thing.abilities[0].ability.name}</strong> and{" "}
										<strong>{thing.abilities[1].ability.name}</strong>
									</>
								) : (
									<>
										<strong> {thing.abilities[0].ability.name}</strong>
									</>
								)}
							</p>
						</li>
						<li>
							<p>
								Types:
								{thing.types.length > 1 ? (
									<>
										<strong> {thing.types[0].type.name}</strong> and <strong>{thing.types[1].type.name}</strong>
									</>
								) : (
									<strong> {thing.types[0].type.name}</strong>
								)}
							</p>
						</li>
						<li>
							<p>
								Weight: <strong>{thing.weight}</strong>
							</p>
						</li>
						<li>
							<p>
								Height: <strong>{thing.height}</strong>
							</p>
						</li>
					</ul>
				</CardItem>
			);
		} else {
			return (
				<CardItem key={thing.id} className="pokemon long">
					<img
						src={thing.sprites.front_default || UndefienedPokemon}
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = UndefienedPokemon;
						}}
						alt={`${thing.name} image`}
					/>
					<div className="informations">
						<h2>{thing.name}</h2>
						<audio src={thing.cries.latest} preload="metadata" controls></audio>
						<ul>
							<li>
								<p>
									Abilities:
									{thing.abilities.length !== 1 ? (
										<>
											<strong> {thing.abilities[0].ability.name}</strong> and{" "}
											<strong>{thing.abilities[1].ability.name}</strong>
										</>
									) : (
										<>
											<strong> {thing.abilities[0].ability.name}</strong>
										</>
									)}
								</p>
							</li>
							<li>
								<p>
									Types:
									{thing.types.length > 1 ? (
										<>
											<strong> {thing.types[0].type.name}</strong> and <strong>{thing.types[1].type.name}</strong>
										</>
									) : (
										<strong> {thing.types[0].type.name}</strong>
									)}
								</p>
							</li>
							<li>
								<p>
									Weight: <strong>{thing.weight}</strong>
								</p>
							</li>
							<li>
								<p>
									Height: <strong>{thing.height}</strong>
								</p>
							</li>
							<li>
								<p>
									Base experience: <strong>{thing.base_experience}</strong>
								</p>
							</li>
						</ul>
					</div>
					<div className="attacks">
						<div>
							<h3>Attacks:</h3>
							{moves.length > 1 &&
								moves.map((move, idx) => (
									<details key={idx}>
										<summary>
											<strong>{move.name}</strong>
										</summary>
										<p>{move.info}</p>
									</details>
								))}
						</div>
					</div>
				</CardItem>
			);
		}
	} else if (whatIs == "berry") {
		return (
			<CardItem key={thing.id} className="berry short">
				<img src={thing.sprites.default}
					alt={`${thing.name} image`}
				/>
				<h2>{thing.name}</h2>
				<ul className="informations">
					<li>
						<p>
							Cost:
							<strong> {thing.cost}</strong>
						</p>
					</li>
					<li>
						<p>
							Category:
							<strong> {thing.category.name}</strong>
						</p>
					</li>
					<li>
						<p>
							Fling power: <strong>{thing.fling_power}</strong>
						</p>
					</li>
					<li>
						<p>
							Effect: <strong>{thing.effect_entries[0].short_effect}</strong>
						</p>
					</li>
				</ul>
			</CardItem>
		);
	}
}
