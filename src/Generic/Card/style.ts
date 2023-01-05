import styled from "styled-components";

export const Wrapper: any = styled.div<{ isHome: boolean }>`
  cursor: pointer;
  background: #ffffff;
  width: fit-content;
  height: fit-content;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 6px 6px 7px rgba(0, 0, 0, 0.25);
  padding: ${({ isHome }) => (isHome ? "10px 90px" : "10px 50px")};
  margin-bottom: 20px;
  grid-gap: 10px;
  ${({ isHome }) => isHome && `margin: 10px auto`};

  @media (max-width: 600px) {
    padding: 10px 40px;
  }
`;
Wrapper.Title = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  color: #000000;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

Wrapper.Image = styled.img<{ isHome: boolean }>`
  width: ${({ isHome }) => (isHome ? "139px" : "133px")};
  height: ${({ isHome }) => (isHome ? "139px" : "133px")};
  @media (max-width: 600px) {
    width: ${({ isHome }) => (isHome ? "86px" : "36.1px")};
    height: ${({ isHome }) => (isHome ? "86px" : "68.16px")};
  }
  @media (min-width: 900px) {
    width: ${({ isHome }) => (isHome ? "199px" : "133px")};
    height: ${({ isHome }) => (isHome ? "199px" : "192px")};
  }
`;
