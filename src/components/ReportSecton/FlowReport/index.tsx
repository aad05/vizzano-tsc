import { FC, useEffect, useState } from "react";
import { Table, TableWrapper, Title } from "../../../Generic/Styles/style";
import { Wrapper } from "./style";
import useQueryHandler from "../../../hooks/useQuery";
import { useDateFormatter } from "../../../Generic/HeaderCalendar";
import { OrderedListOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TableLoading from "../../../Generic/TableLoading";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
interface FlowReportAPIType {
  name: string;
  data: any;
}

const FlowReport: FC<{ date: Date }> = ({ date }) => {
  const navigate = useNavigate();
  const useQuery = useQueryHandler();
  const format = useDateFormatter();
  const [activeFlow, setActiveFlow] = useState<number>(0);
  const [isShowPieChart, setShowPieChart] = useState(false);
  const [pieChartData, setPieChartData] = useState<any>([]);
  const formatter = new Intl.NumberFormat("en");

  const { data, isLoading } = useQuery({
    method: "GET",
    queryLink: `/merchants/report/${date.getTime()}`,
    queryKey: `/report/count-work/${format(date)}`,
  });

  useEffect(() => {
    const selectedFlowRow = data?.data?.data[activeFlow - 1]?.data;

    if (selectedFlowRow) {
      const keys = Object.keys(data?.data?.data[activeFlow - 1]?.data);
      setPieChartData(
        keys
          ?.filter((value) => value !== "price")
          ?.map((key) => {
            return {
              name:
                key === "fake" ? "Брак" : key === "things" ? "Штук" : "Цена",
              pv: selectedFlowRow[key],
            };
          })
      );
      setShowPieChart(true);
    }
  }, [activeFlow]);

  return (
    <Wrapper>
      <Title>Поток отчеты:</Title>
      {isLoading ? (
        <TableLoading trCount={10} />
      ) : (
        <TableWrapper>
          <Table>
            <Table.Head>
              <Table.Tr>
                <Table.Th first>
                  {" "}
                  <OrderedListOutlined />
                </Table.Th>
                <Table.Th first>Поток</Table.Th>
                <Table.Th first danger>
                  Брак
                </Table.Th>
                <Table.Th>Итоговая сумма</Table.Th>
                <Table.Th borderLeft>Действие</Table.Th>
              </Table.Tr>
            </Table.Head>
            <Table.Body>
              {data?.data?.data?.map(
                (
                  { name, data: calcDate }: FlowReportAPIType,
                  index: number
                ) => (
                  <Table.Tr key={index}>
                    <Table.Td first>{index + 1}</Table.Td>
                    <Table.Td first>{name}</Table.Td>
                    <Table.Td first danger>
                      {calcDate?.fake}
                    </Table.Td>
                    <Table.Td first>
                      {formatter.format(calcDate?.price)} сўм{" "}
                    </Table.Td>
                    <Table.Td borderLeft>
                      <Button
                        type={activeFlow === index + 1 ? "primary" : "default"}
                        onClick={() => {
                          if (activeFlow === index + 1) {
                            setActiveFlow(0);
                            setShowPieChart(false);
                          } else setActiveFlow(index + 1);
                        }}
                      >
                        Показать диаграмму
                      </Button>
                      <Button
                        onClick={() =>
                          navigate(
                            `/flow/${index + 1}/count-work/${date.getTime()}`
                          )
                        }
                        type={"text"}
                        style={{ marginLeft: "10px" }}
                      >
                        Смотрить подробно
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                )
              )}
            </Table.Body>
          </Table>
        </TableWrapper>
      )}
      {isShowPieChart && (
        <TableWrapper>
          <Title>Поток {activeFlow} диаграмма</Title>
          <BarChart
            width={350}
            height={300}
            data={pieChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 50, right: 50 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </TableWrapper>
      )}
    </Wrapper>
  );
};

export default FlowReport;
