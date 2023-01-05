import styled from "styled-components";

export const Wrapper: any = styled.div`
  width: 100%;
`;
Wrapper.Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 20px;
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
  display: flex;
  justify-content: center;
  grid-gap: 150px;
  @media (max-width: 1000px) {
    width: 100%;
    margin: auto;
    display: grid;
    gap: 1rem;
    grid-gap: 10px;
    grid-template-columns: repeat(2, 1fr);
  }
`;
