import styled from "styled-components";

export const Wrapper: any = styled.div`
  width: 100%;
`;
Wrapper.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
