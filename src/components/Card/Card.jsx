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

	// long

	&.long {
		min-height: 500px;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		gap: 30px;
	}

	&.long img {
		min-width: 250px;
		max-width: 25%;
		width: 100%;
		max-height: 100%;
		min-height: 50%;
		margin-top: 20px;
		object-fit: cover;
	}

	&.long .informations {
		min-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 25px;
		margin: 30px 40px;
	}

	&.long .informations h2 {
		width: 100%;
		margin-bottom: 7px;
		font-size: 2.8em;
		text-align: center;
	}

	&.long audio {
		scale: 1.2;
	}

	&.long .informations ul {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin: 0;
	}

	&.long .informations li p {
		font-size: 1.2em;
	}

	&.long .attacks {
		max-width: 30%;
		width: 400px;
		min-width: 200px;
		display: flex;
		padding: 20px;
	}

	&.long .attacks div {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	&.long .attacks h3 {
		font-size: 1.8em;
	}

	&.long .attacks details summary {
		font-size: 1.3em;
	}

	&.long .attacks details p {
		font-size: 1.2em;
	}

	@media (max-width: 768px) {
		&.long {
			gap: 25px;
		}

		&.long .informations {
			min-width: 200px;
			gap: 20px;
			margin: 10px 0;
		}

		&.long .informations h2 {
			font-size: 2.4em;
		}

		&.long .informations li p {
			font-size: 1em;
		}

		&.long .attacks div {
			gap: 10px;
		}

		&.long .attacks h3 {
			font-size: 1.6em;
		}

		&.long .attacks details summary {
			font-size: 1.2em;
		}

		&.long .attacks details p {
			font-size: 1em;
		}
	}

	@media (max-width: 500px) {
		&.long {
			gap: 0;
		}

		&.long img {
			min-width: 150px;
			max-height: 75%;
			margin-top: 30px;
		}

		&.long audio {
			min-width: 100%;
			scale: 1;
		}

		&.long .attacks {
			max-width: 768px;
			width: 100%;
			margin-top: 15px;
		}
	}

	// Short version

	&.short {
		min-height: 350px;
		height: 100%;
		flex-direction: column;
		align-items: center;
		border: 3px solid #cccccc82;
		border-radius: 12px;
		padding: 18px 12px;
		background-color: #6a686892;
	}

	&.short img {
		max-height: 90px;
		margin: 5px 0px;
		scale: 1.4;
		object-fit: cover;
	}

	&.short img {
		cursor: pointer;
	}

	&.berry img {
		margin: 15px 0 25px;
		scale: 2;
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
	}

	@media (max-width: 768px) {
		&.short {
			display: flex;
			max-height: 400px;
			height: 100%;
			flex-direction: column;
			align-items: center;
			border: 3px solid #cccccc82;
			border-radius: 12px;
			padding: 18px 12px;
			background-color: #6a686892;
		}

		&.short img {
			max-height: 70px;
			margin: 0px;
			scale: 1.3;
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
				<img
					onClick={() => {
						alert("Soon...");
					}}
					src={thing.sprites.default}
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
