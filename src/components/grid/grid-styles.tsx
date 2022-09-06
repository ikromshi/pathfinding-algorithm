import styled from "styled-components";

export const GridStyles = styled.div`
  max-width: 100vw;
  margin: 100px auto;
  padding: 10px;

  display: grid;
  grid-template-columns: repeat(50, 1fr);
  grid-auto-rows: minmax(1rem, auto);
  gap: no-gap;
`;
