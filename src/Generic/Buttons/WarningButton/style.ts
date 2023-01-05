import styled from "styled-components";

interface ButtonProp {
  warningAnimation: boolean;
  mt?: string;
  bgColor: string;
}

export const Button = styled.div<ButtonProp>`
  margin-top: ${({ mt }) => mt};
  width: 80%;
  height: 50px;
  border: 1px solid #f0eef7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  padding: 0 15px;
  background: ${({ bgColor }) => bgColor};
  @media (min-width: 2000px) {
    height: 70px;
    font-size: 22px;
  }
  ${({ warningAnimation }) =>
    warningAnimation &&
    `
    animation: rotate 0.7s ease-in-out both;
  @keyframes rotate {
    0% {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
    25% {
      transform: rotate(3deg) translate3d(0, 0, 0);
    }
    50% {
      transform: rotate(-3deg) translate3d(0, 0, 0);
    }
    75% {
      transform: rotate(1deg) translate3d(0, 0, 0);
    }
    100% {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
  }
  `}
`;
