import styled from "styled-components";

export const GridStyles = styled.div`
minor-additions
  min-height: 75vh;
  min-width: 60vw;
  margin: 3rem 1rem;

  display: grid;
  grid-template-columns: repeat(50, 1fr);
  grid-auto-rows: minmax(1fr, auto);
`;
