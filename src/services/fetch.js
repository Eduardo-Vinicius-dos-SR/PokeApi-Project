export async function customFetch(url, wanted, quantity, limit) {
	const resp = await fetch(
		url !== "" ? url : `https://pokeapi.co/api/v2/${wanted}?offset=${quantity}&limit=${limit}`
	).then((res) => res.json());

	return resp;
}
