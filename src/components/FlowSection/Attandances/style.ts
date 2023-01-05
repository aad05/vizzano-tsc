import styled from "styled-components";

export const Wrapper: any = styled.div``;
Wrapper.Title = styled.div<{ first?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 34px;
  color: #000000;
  text-align: center;
  margin: ${({ first }) => (first ? `50px` : "20px")};
  @media (max-width: 600px) {
    margin: 40px;
    font-size: 24px;
  }
`;
