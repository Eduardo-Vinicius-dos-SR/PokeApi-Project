import { useEffect, useState } from "react";
import loadingIcon from "../assets/img/loadingMobile.png";
import styled from "styled-components";
import { customFetch } from "../services/fetch";
import { LoadMore } from "./Load/Loadmore";

const Loading = styled.div`
	margin: 0 auto;
	text-align: center;

	& img {
		animation: loading-spin infinite 7s linear;
	}
`;

export function Fetch({
	url = "",
	wanted,
	loadMoreRequired = true,
	offset = 0,
	limit = 12,
	loadingTime = 200,
	isFetchWanted = true,
	thing,
	howMuchFetch = 1,
	children,
}) {
	const [things, setThings] = useState([]);
	const [quantity, setQuantity] = useState(offset);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchWanted() {
			setLoading(true);

			try {
				if (!isFetchWanted) {
					setThings(Array.isArray(thing) ? thing : []);
					setLoading(false);
					return;
				}

				let currentResults = await customFetch(url, wanted, quantity, limit);
				let results = currentResults.results || [];

				for (let i = 0; i < howMuchFetch; i++) {
					let urls = [];
					if (Array.isArray(results) && results.length > 0) {
						urls = results.map((item) => item.url || (item.item && item.item.url)).filter(Boolean);
					}
					if (!urls || urls.length === 0) break;
					results = await Promise.all(urls.map((u) => fetch(u).then((res) => res.json())));
				}

				setThings((prev) => {
					const prevIds = new Set(prev.map((item) => item.id));
					const uniqueResults = Array.isArray(results) ? results.filter((item) => !prevIds.has(item.id)) : [];
					return [...prev, ...uniqueResults];
				});

				setTimeout(() => {
					setLoading(false);
				}, loadingTime);
			} catch (error) {
				console.error("Erro ao buscar os dados:", error);
			}
		}

		fetchWanted();
	}, [url, wanted, quantity, offset, limit, loadingTime, isFetchWanted, howMuchFetch]);

	return (
		<>
			{children({ things })}

			{loading && (
				<Loading>
					<p>Loading...</p>
					<br />
					<img src={loadingIcon} alt="Loading Icon" />
				</Loading>
			)}

			{!loading && loadMoreRequired && <LoadMore setQuantity={setQuantity} quantity={quantity}></LoadMore>}
		</>
	);
}
