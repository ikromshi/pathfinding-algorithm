import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: linear-gradient(
      to left, 
      rgba(134, 165, 217, 1) 0%,
      rgba(150, 189, 198, 1) 50%,
      rgba(131, 188, 255, 1) 100%
    );
  }
`;
