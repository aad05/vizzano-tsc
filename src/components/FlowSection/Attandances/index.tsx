import { FC, useState } from "react";
import { Wrapper } from "./style";
import HeaderCalendar, {
  useDateFormatter,
} from "../../../Generic/HeaderCalendar";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../../Generic/Styles/style";
import useQueryHandler from "../../../hooks/useQuery";
import TableLoading from "../../../Generic/TableLoading";
import TableComponent from "./Table";
import { Button } from "antd";
import AddModal from "./AddModal";

const Attandances: FC = () => {
  const navigate = useNavigate();
  const useQuery = useQueryHandler();
  const format = useDateFormatter();
  const { paramsDate, idFlow } = useParams();
  const [currentData, setCurrentData] = useState<number>(Number(paramsDate));
  const [addModalOpen, setAddModalOpen] = useState(false);
  const timeChangeHandle = (time?: number) => setCurrentData(Number(time));
  const date = new Date(currentData);

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
      <AddModal
        flowType={String(idFlow)}
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        createDate={date}
      />
      <Title first={true}>Посещаемость</Title>
      <HeaderCalendar
        onDayChange={timeChangeHandle}
        dayMinus={timeChangeHandle}
        dayPlus={timeChangeHandle}
        date={date}
      />
      <Button
        type="primary"
        disabled={isLoading}
        style={{
          borderRadius: "12px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
        onClick={() => setAddModalOpen(true)}
      >
        + Добавить учасников
      </Button>
      {!!isLoading ? (
        <TableLoading trCount={10} />
      ) : (
        <TableComponent
          data={
            Array.isArray(data?.data?.data[0]?.data)
              ? data?.data?.data[0]?.data
              : data?.data?.data?.data
          }
          isAllCome={
            Array.isArray(data?.data?.data[0]?.data)
              ? data?.data?.data[0]?.isAllCome
              : data?.data?.data?.isAllCome
          }
          _dataid={
            Array.isArray(data?.data?.data[0]?.data)
              ? data?.data?.data[0]?._id
              : data?.data?.data?._id
          }
          date={date}
          idFlow={idFlow + ""}
        />
      )}
      <Button
        style={{
          borderRadius: "12px",
          margin: "50px 0",
        }}
        onClick={() => navigate(`/flow/${idFlow}/count-work/${date.getTime()}`)}
      >
        Перейти к штук работ
      </Button>
    </Wrapper>
  );
};

export default Attandances;
