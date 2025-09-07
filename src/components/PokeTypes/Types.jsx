import styled from "styled-components";
import { useState } from "react";

import { Fetch } from "../Fetch.jsx";
import { Link } from "react-router-dom";
import { Type } from "../PokeTypes/Type.jsx";

const TypesDiv = styled.div`
	min-height: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Ul = styled.ul`
	max-width: 80%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-self: flex-start;
	gap: 20px 35px;
	margin: 0 auto 20px;

	li button {
		border: none;
		padding: 0 5px;
		background-color: rgba(0, 0, 0, 0.2);
		transition: 0.3s ease-in-out;
	}
	li button:hover {
		border: none;
		text-decoration: underline;
		background-color: rgba(0, 0, 0, 0.25);
	}
	li button:active {
		scale: 0.95;
	}

	li p {
		font-size: 1.25em;
	}

	@media (max-width: 425px) {
		gap: 10px 20px;

		li p {
			font-size: 0.8em;
		}
	}
`;

export function Types() {
	const [selectedType, setSelectedType] = useState(null);
	const [isSelected, setIsSelected] = useState(false);

	return (
		<Fetch wanted="type" limit={18} loadingTime={100} loadMoreRequired={false} howMuchFetch={2}>
			{({ things }) => (
				<TypesDiv>
					<Ul>
						{things.length > 0 &&
							things.map((thing, idx) => (
								<li className="option" key={thing.id || idx}>
									<button
										className={`${thing.name}_Type`}
										onClick={() => {
											setIsSelected(true);
											setSelectedType(thing.name);
										}}
									>
										<p> {thing.name}</p>
									</button>
								</li>
							))}
					</Ul>
					{isSelected && <Type type={selectedType} allTypes={things} />}
				</TypesDiv>
			)}
		</Fetch>
	);
}
