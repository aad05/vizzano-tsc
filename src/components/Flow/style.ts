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
Wrapper.SectionCardContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-gap: 150px;
  @media (max-width: 1000px) {
    grid-gap: 70px;
  }
  @media (max-width: 800px) {
    grid-gap: 30px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
