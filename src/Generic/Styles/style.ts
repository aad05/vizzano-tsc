import { Input } from "antd";
import styled from "styled-components";

export const Wrapper: any = styled.div``;

export const Title = styled.div<{ first?: boolean }>`
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
export const TableWrapper = styled.div`
  margin-bottom: 50px;
  @media (max-width: 600px) {
    width: 95%;
    overflow: auto;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
`;
export const Table: any = styled.table`
  background-color: #fff;
  border-radius: 12px;
`;
Table.Head = styled.thead``;
Table.Body = styled.tbody``;
Table.Tr = styled.tr<{ danger: boolean }>`
  margin: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #f0f0f0;
`;
Table.Td = styled.td<{
  first?: boolean;
  borderLeft?: boolean;
  danger: boolean;
  success: boolean;
}>`
  margin: 5px 10px;
  padding: 7px 15px;
  ${({ first }) => first && `border-right: 1px solid #F0F0F0;`};
  ${({ borderLeft }) => borderLeft && `border-left: 1px solid #F0F0F0;`};
  align-items: center;
  white-space: nowrap;
  ${({ danger }) => danger && "background: #FFF1E8; color: #D3380D"}
  ${({ success }) => success && "background: #F6FFEC; color: #399E0E"}
`;
Table.Th = styled.th<{
  first?: boolean;
  borderLeft?: boolean;
  danger: boolean;
  success: boolean;
}>`
  margin: 5px 10px;
  padding: 7px 15px;
  ${({ first }) =>
    first && `border-right: 1px solid #F0F0F0; margin-bottom: 5px`};
  ${({ borderLeft }) => borderLeft && `border-left: 1px solid #F0F0F0;`};
  font-weight: bold;
  white-space: nowrap;
  ${({ danger }) => danger && "background: #FFF1E8; color: #D3380D"}
  ${({ success }) => success && "background: #F6FFEC; color: #399E0E"}
`;
Wrapper.Input = styled(Input)`
  .ant-input-group-addon {
    border: none;
  }
`;
Wrapper.ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  grid-gap: 5px;
`;
Wrapper.ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
Wrapper.Form = styled.div`
  width: 100%;
`;
Wrapper.InputWrapper = styled.div`
  margin-top: 20px;
`;
Wrapper.Label = styled.div``;
