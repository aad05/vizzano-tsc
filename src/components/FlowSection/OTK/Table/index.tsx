import { FC, useState } from "react";
import { TableWrapper, Table } from "../../../../Generic/Styles/style";
import { OrderedListOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useOTKProductDeleteByID } from "../../../../hooks/useQuery/useOTK";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { switchSelectedData } from "../../../../redux/otkSlice";
import NumberInuput from "./NumberInput";
import TextInput from "./TextInput";

interface TableComponentPorp {
  _id: string;
  productName: string;
  things: number;
  fake: number;
}

const TableComponent: FC<{
  data: TableComponentPorp[];
  date: Date;
  idFlow: string;
  _dataid: string;
}> = ({ date, idFlow, data, _dataid }) => {
  const { mutate: deleteMutate } = useOTKProductDeleteByID();
  const selectedData = useAppSelector((state) => state.otk.selectedData);
  const dispatch = useAppDispatch();
  const [selectType, setSelectType] = useState("");

  const doubleClickHandler = (data: {
    _id: string;
    value: Object;
    type: "productName" | "fake" | "things";
  }) => {
    setSelectType(data.type);
    selectedData._id !== data._id &&
      dispatch(switchSelectedData({ ...data.value }));
  };

  return (
    <TableWrapper>
      <Table>
        <Table.Head>
          <Table.Tr>
            <Table.Th first>
              <OrderedListOutlined />
            </Table.Th>
            <Table.Th first>Продукты</Table.Th>
            <Table.Th success green first>
              Штук
            </Table.Th>
            <Table.Th danger>Брак</Table.Th>
            <Table.Th>Действие</Table.Th>
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {data?.map((value: TableComponentPorp, index: number) => (
            <Table.Tr key={value._id} isEnd={index + 1 === data?.length}>
              <Table.Td first>{index + 1}</Table.Td>
              <Table.Td
                first
                onDoubleClick={() =>
                  doubleClickHandler({
                    _id: value._id,
                    value,
                    type: "productName",
                  })
                }
              >
                {selectedData._id === value._id &&
                selectType === "productName" ? (
                  <TextInput _id={_dataid} />
                ) : (
                  value.productName
                )}
              </Table.Td>
              <Table.Td
                success
                first
                onDoubleClick={() =>
                  doubleClickHandler({ _id: value._id, value, type: "things" })
                }
              >
                {selectedData._id === value._id && selectType === "things" ? (
                  <NumberInuput type={"things"} _id={_dataid} />
                ) : (
                  value.things
                )}
              </Table.Td>
              <Table.Td
                danger
                first
                onDoubleClick={() =>
                  doubleClickHandler({ _id: value._id, value, type: "fake" })
                }
              >
                {selectedData._id === value._id && selectType === "fake" ? (
                  <NumberInuput type={"fake"} _id={_dataid} />
                ) : (
                  value.fake
                )}
              </Table.Td>
              <Table.Th first>
                <Button
                  danger
                  onClick={() => deleteMutate({ date, idFlow, _id: value._id })}
                >
                  Удалить
                </Button>
              </Table.Th>
            </Table.Tr>
          ))}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};
export default TableComponent;
