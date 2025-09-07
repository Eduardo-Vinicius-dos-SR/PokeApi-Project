import styled from "styled-components";

const Loadmore = styled.button`
	margin: 5px auto;
	padding: 18px 25px;
`;

export function LoadMore({ quantity, setQuantity }) {
	return (
		<Loadmore className="load_more" onClick={() => setQuantity(quantity + 12)}>
			Load More
		</Loadmore>
	);
}
