import styled from "styled-components";

const Button = styled.button`
  color: #333;
  margin: 0 auto;
  width: auto;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 1rem;
  background-color: #ddfdfe;
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
  &:hover {
    background-color: #c0fdfb;
    color: #828489;
  }
`;

export default Button;
