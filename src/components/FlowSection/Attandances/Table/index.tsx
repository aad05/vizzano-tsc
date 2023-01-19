import { FC, useEffect, useState } from "react";
import { TableWrapper, Table } from "../../../../Generic/Styles/style";
import { OrderedListOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import {
  useDeleteByID,
  useSwitchAllCome,
  useSwitchById,
} from "../../../../hooks/useQuery/useAttandance";

interface TableComponentPorp {
  _id: string;
  fullName: string;
  isCome: boolean;
}

const TableComponent: FC<{
  data: TableComponentPorp[];
  isAllCome?: boolean;
  date: Date;
  idFlow: string;
  _dataid: string;
}> = ({ data, isAllCome, date, idFlow, _dataid }) => {
  const { mutate: toggleAllMutate } = useSwitchAllCome();
  const { mutate: toggleMutate } = useSwitchById();
  const { mutate: deleteMutate } = useDeleteByID();
  const [isAllComeState, setAllComeState] = useState(isAllCome);
  const [isCameChangeOccured, setCameChangeOccured] = useState(false);

  useEffect(() => {
    const checkResponse = data?.every((value) => value.isCome);
    setAllComeState(checkResponse);
  }, [isCameChangeOccured, data]);

  return (
    <TableWrapper>
      <Table>
        <Table.Head>
          <Table.Tr>
            <Table.Th first>
              <OrderedListOutlined />{" "}
            </Table.Th>
            <Table.Th first>
              <Checkbox
                disabled={!data?.length}
                checked={isAllComeState}
                onChange={(e) => {
                  setAllComeState(e.target.checked);
                  toggleAllMutate({
                    switchParams: e.target.checked,
                    date,
                    idFlow,
                  });
                }}
              />
            </Table.Th>
            <Table.Th>Имя фамили</Table.Th>
            <Table.Th borderLeft>Действие</Table.Th>
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {data?.map(({ _id, fullName, isCome }, index: number) => (
            <Table.Tr key={_id} isEnd={index + 1 === data?.length}>
              <Table.Td first>{index + 1}</Table.Td>
              <Table.Td first>
                <Checkbox
                  onChange={() => {
                    setCameChangeOccured(!isCameChangeOccured);
                    toggleMutate({
                      date,
                      idFlow,
                      _id: _dataid,
                      userData: data[index],
                    });
                  }}
                  checked={isCome}
                />
              </Table.Td>
              <Table.Td>{fullName}</Table.Td>
              <Table.Td borderLeft>
                <Button
                  onClick={() => {
                    deleteMutate({ date, idFlow, _id });
                  }}
                  danger
                >
                  Удалить
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};
export default TableComponent;
