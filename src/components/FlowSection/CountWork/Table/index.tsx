import { FC, useState } from "react";
import { TableWrapper, Table } from "../../../../Generic/Styles/style";
import { OrderedListOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../../../hooks/useRedux";
import { switchSelectedData } from "../../../../redux/countWorkSlice";
import FakeInput from "./NumberInput";
import TextInput from "./TextInput";

interface TableComponentPorp {
  _id: string;
  fullName: string;
  isCome: boolean;
  things: number;
  fake: number;
  price: number;
}

const TableComponent: FC<{ data: TableComponentPorp[]; _dataid: string }> = ({
  data,
  _dataid,
}) => {
  const selectedData = useAppSelector((state) => state.countWork.selectedData);
  const dispatch = useAppDispatch();
  const [selectType, setSelectType] = useState("");

  const doubleClickHandler = (data: {
    _id: string;
    value: Object;
    type: "fullName" | "fake" | "price";
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
            <Table.Th first>Имя фамилия</Table.Th>
            <Table.Th danger first>
              Брак
            </Table.Th>
            <Table.Th>Итогo</Table.Th>
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {data?.map((value: TableComponentPorp, index: number) => (
            <Table.Tr key={value._id} isEnd={index + 1 === data?.length}>
              <Table.Td danger={!value.isCome} first>
                {index + 1}
              </Table.Td>

              <Table.Td
                onDoubleClick={() =>
                  doubleClickHandler({
                    _id: value._id,
                    value,
                    type: "fullName",
                  })
                }
                danger={!value.isCome}
                first
              >
                {selectedData._id === value._id && selectType === "fullName" ? (
                  <TextInput _id={_dataid} />
                ) : (
                  value.fullName
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
                  <FakeInput type={"fake"} _id={_dataid} />
                ) : (
                  value.fake
                )}
              </Table.Td>
              <Table.Td
                onDoubleClick={() =>
                  doubleClickHandler({ _id: value._id, value, type: "price" })
                }
                danger={!value.isCome}
                first
              >
                {selectedData._id === value._id && selectType === "price" ? (
                  <FakeInput type={"price"} _id={_dataid} />
                ) : (
                  value.price
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};
export default TableComponent;
