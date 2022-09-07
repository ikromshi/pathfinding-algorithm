import styled from "styled-components";

export const GridStyles = styled.div`
  min-height: 75vh;
  min-width: 60vw;
  margin: 100px 1rem;
  // padding: 10px;

  display: grid;
  grid-template-columns: repeat(50, 1fr);
  grid-auto-rows: minmax(1fr, auto);
`;
