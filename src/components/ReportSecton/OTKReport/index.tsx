import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDateFormatter } from "../../../Generic/HeaderCalendar";
import { Table, TableWrapper, Title } from "../../../Generic/Styles/style";
import useQueryHandler from "../../../hooks/useQuery";
import { OrderedListOutlined } from "@ant-design/icons";
import { Wrapper } from "./style";
import { Button } from "antd";
import TableLoading from "../../../Generic/TableLoading";

const OTKReport: FC<{ date: Date }> = ({ date }) => {
  const navigate = useNavigate();
  const useQuery = useQueryHandler();
  const format = useDateFormatter();

  const { data, isLoading } = useQuery({
    method: "GET",
    queryLink: `/otk/reports/${date.getTime()}`,
    queryKey: `/report/otk/${format(date)}`,
  });

  return (
    <Wrapper>
      <Title>OTK отчеты:</Title>
      {isLoading ? (
        <TableLoading trCount={10} />
      ) : (
        <TableWrapper>
          <Table>
            <Table.Head>
              <Table.Tr>
                <Table.Th first>
                  <OrderedListOutlined />
                </Table.Th>
                <Table.Th first>Название ОТК</Table.Th>
                <Table.Th green first success>
                  Штук
                </Table.Th>
                <Table.Th danger first>
                  Брак
                </Table.Th>
                <Table.Th>Действие</Table.Th>
              </Table.Tr>
            </Table.Head>
            {data?.data?.data?.map((value: any, index: number) => (
              <Table.Body>
                <Table.Tr>
                  <Table.Td first>{index + 1}</Table.Td>
                  <Table.Td first>ОТК № {index + 1}</Table.Td>
                  <Table.Td green first success>
                    {value["0"]?.data.reduce(
                      (accumulator: number, currentValue: any) =>
                        +currentValue.things + accumulator,
                      0
                    ) || 0}{" "}
                  </Table.Td>
                  <Table.Td first danger>
                    {value["0"]?.data.reduce(
                      (accumulator: number, currentValue: any) =>
                        +currentValue.fake + accumulator,
                      0
                    ) || 0}
                  </Table.Td>
                  <Table.Th>
                    <Button
                      onClick={() =>
                        navigate(`/flow/${index + 1}/otk/${date.getTime()}`)
                      }
                      type={"primary"}
                    >
                      Смотрить подробно ОТК {index + 1}
                    </Button>
                  </Table.Th>
                </Table.Tr>
              </Table.Body>
            ))}
          </Table>
        </TableWrapper>
      )}
    </Wrapper>
  );
};

export default OTKReport;
