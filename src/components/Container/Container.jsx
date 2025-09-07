import styled from "styled-components";

const Contain = styled.main`
	min-height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	padding: 20px 50px;
	margin: 0 0 auto;

	@media (max-width: 768px) {
		padding: 10px 0;
	}
`;

export function Container({ children }) {
	return <Contain>{children}</Contain>;
}
