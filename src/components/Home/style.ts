import styled from "styled-components";

export const Wrapper: any = styled.div`
  width: 100%;
`;
Wrapper.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
Wrapper.Title = styled.div<{ first: boolean }>`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 34px;
  line-height: 77px;
  color: #000000;
  margin: ${({ first }) => (first ? `100px` : "40px")};
  @media (max-width: 600px) {
    margin: 40px;
    font-size: 24px;
  }
`;
Wrapper.SectionCardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  grid-gap: 150px;
  @media (max-width: 600px) {
    grid-gap: 36px;
  }
`;
