import styled from "styled-components";
import { DatePicker } from "antd";

export const Wrapper: any = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  grid-gap: 20px;
  @media (max-width: 600px) {
    grid-gap: 0;
  }
`;
Wrapper.DatePicker = styled(DatePicker)``;
Wrapper.Title = styled.div<{ first?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #000000;
  text-align: center;
  @media (max-width: 600px) {
    margin: 40px;
    font-size: 20px;
  }
`;
