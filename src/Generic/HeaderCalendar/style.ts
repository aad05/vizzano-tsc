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
