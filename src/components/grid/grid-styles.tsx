import styled from "styled-components";

export const GridStyles = styled.div`
  min-height: 75vh;
  min-width: 60vw;
  margin: 3rem 1rem 0 1rem;
  outline: 1px solid #797c76;

  display: grid;
  grid-template-columns: repeat(50, 1fr);
  grid-auto-rows: minmax(1rem, auto);
`;
