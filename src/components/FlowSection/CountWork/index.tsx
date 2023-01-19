import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderCalendar, {
  useDateFormatter,
} from "../../../Generic/HeaderCalendar";
import { Title } from "../../../Generic/Styles/style";
import { Wrapper } from "./style";
import useQueryHandler from "../../../hooks/useQuery";
import TableLoading from "../../../Generic/TableLoading";
import TableComponent from "./Table";
import { Button } from "antd";

const CountWork: FC = () => {
  const navigate = useNavigate();
  const useQuery = useQueryHandler();
  const { paramsDate, idFlow } = useParams();
  const format = useDateFormatter();
  const [currentData, setCurrentData] = useState<number>(Number(paramsDate));
  const date = new Date(currentData);
  const timeChangeHandle = (time?: number) => setCurrentData(Number(time));

  const { data, isLoading } = useQuery({
    method: "POST",
    queryLink: "/merchants",
    queryKey: `${idFlow}/attandances/${format(date)}`,
    body: {
      flowType: idFlow,
      createDate: date.getTime(),
    },
  });

  return (
    <Wrapper>
      <Title first={true}>Штук работ</Title>
      <HeaderCalendar
        onDayChange={timeChangeHandle}
        dayMinus={timeChangeHandle}
        dayPlus={timeChangeHandle}
        date={date}
      />
      {!!isLoading ? (
        <TableLoading trCount={10} />
      ) : (
        <TableComponent
          data={
            Array.isArray(data?.data?.data[0]?.data)
              ? data?.data?.data[0]?.data
              : data?.data?.data?.data
          }
          _dataid={
            Array.isArray(data?.data?.data[0]?.data)
              ? data?.data?.data[0]?._id
              : data?.data?.data?._id
          }
        />
      )}
      <Button
        style={{
          borderRadius: "12px",
          margin: "50px 0",
        }}
        onClick={() => navigate(`/flow/${idFlow}/attandance/${date.getTime()}`)}
      >
        Перейти к посещаемость
      </Button>
    </Wrapper>
  );
};

export default CountWork;
