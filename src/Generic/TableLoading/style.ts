import styled from "styled-components";

export const Wrapper: any = styled.div``;

Wrapper.TableWrapper = styled.div`
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
Wrapper.Table = styled.table`
  background-color: #fff;
  border-radius: 12px;
`;
Wrapper.Table.Head = styled.thead``;
Wrapper.Table.Body = styled.tbody``;
Wrapper.Table.Tr = styled.tr`
  margin: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #f0f0f0;
`;
Wrapper.Table.Td = styled.td<{ first: boolean; borderLeft: boolean }>`
  margin: 5px 10px;
  padding: 7px 15px;
  ${({ first }) => first && `border-right: 1px solid #F0F0F0;`};
  ${({ borderLeft }) => borderLeft && `border-left: 1px solid #F0F0F0;`};
  align-items: center;
  white-space: nowrap;
`;
Wrapper.Table.Th = styled.th<{ first: boolean; borderLeft: boolean }>`
  margin: 5px 10px;
  padding: 7px 15px;
  ${({ first }) =>
    first && `border-right: 1px solid #F0F0F0; margin-bottom: 5px`};
  ${({ borderLeft }) => borderLeft && `border-left: 1px solid #F0F0F0;`};
  font-weight: bold;
  white-space: nowrap;
`;
Wrapper.CheckBox = styled.input``;
Wrapper.AddButton = styled.div`
  margin: 30px 0;
  background: #cdb88f;
  border-radius: 30px;
  padding: 5px 20px;
  color: #fff;
  cursor: pointer;
`;
