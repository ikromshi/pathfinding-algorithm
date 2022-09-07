import styled from "styled-components";

export const Button = styled.button`
  color: #457b9d;
  margin: 0 auto;
  margin-top: 2rem;
  width: 30%;
  font-size: 100%;
  letter-spacing: 0.5px;
  padding: 0 35px 0 35px;
  background-color: #c0fdfb;
  text-transform: uppercase;
  font-family: "Roboto";
  font-weight: bolder;
  border: 1px solid #81a4cd;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 5rem;
  height: 3rem;
  @media screen and (max-width: 900px) {
    width: 50%;
  }
  @media screen and (max-width: 540px) {
    width: 65%;
    font-size: 85%;
  }
  @media screen and (max-width: 370px) {
    width: 50%;
    font-size: 70%;
  }
  &:hover {
    background-color: #ddfdfe;
    color: #828489;
  }
`;

export default Button;
