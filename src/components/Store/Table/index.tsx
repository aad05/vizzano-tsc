import { FC, useState } from "react";
import { TableWrapper, Table } from "../../../Generic/Styles/style";
import { OrderedListOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { switchSelectedData } from "../../../redux/storeSlice";
import NumberInuput from "./NumberInput";
import { useStoreProductDeleteByID } from "../../../hooks/useQuery/useStore";
import TextInput from "./TextInput";

interface TableComponentPorp {
  _id: string;
  productName: string;
  things: string;
  sendedThings: string;
}

const TableComponent: FC<{
  data: TableComponentPorp[];
  cancelFeatures?: boolean;
}> = ({ data, cancelFeatures }) => {
  const [selectType, setSelectType] = useState("");
  const selectedData = useAppSelector((state) => state.store.selectedData);
  const { mutate: deleteMutate } = useStoreProductDeleteByID();
  const dispatch = useAppDispatch();

  const doubleClickHandler = (data: {
    _id: string;
    value: Object;
    type: "productName" | "sendedThings" | "things";
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
              <OrderedListOutlined />{" "}
            </Table.Th>
            <Table.Th>Продукты</Table.Th>
            <Table.Th success>Штук товаров</Table.Th>
            <Table.Th danger>Отправленные товары</Table.Th>
            {!cancelFeatures && <Table.Th borderLeft>Действие</Table.Th>}
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {data?.map((value: TableComponentPorp, index: number) => (
            <Table.Tr key={value._id} isEnd={index + 1 === data?.length}>
              <Table.Td first>{index + 1}</Table.Td>
              <Table.Td
                onDoubleClick={() =>
                  doubleClickHandler({
                    type: "productName",
                    value,
                    _id: value._id,
                  })
                }
              >
                {value._id === selectedData._id &&
                selectType === "productName" ? (
                  <TextInput />
                ) : (
                  value.productName
                )}
              </Table.Td>
              <Table.Td
                success
                onDoubleClick={() =>
                  doubleClickHandler({
                    type: "things",
                    value,
                    _id: value._id,
                  })
                }
              >
                {value._id === selectedData._id && selectType === "things" ? (
                  <NumberInuput type="things" />
                ) : (
                  value.things
                )}
              </Table.Td>
              <Table.Td
                danger
                onDoubleClick={() =>
                  doubleClickHandler({
                    type: "sendedThings",
                    value,
                    _id: value._id,
                  })
                }
              >
                {value._id === selectedData._id &&
                selectType === "sendedThings" ? (
                  <NumberInuput type="sendedThings" />
                ) : (
                  value.sendedThings
                )}
              </Table.Td>
              {!cancelFeatures && (
                <Table.Td borderLeft>
                  <Button
                    danger
                    onClick={() => deleteMutate({ _id: value._id })}
                  >
                    Удалить
                  </Button>
                </Table.Td>
              )}
            </Table.Tr>
          ))}
        </Table.Body>
      </Table>
    </TableWrapper>
  );
};
export default TableComponent;
