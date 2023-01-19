import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderCalendar, {
  useDateFormatter,
} from "../../../Generic/HeaderCalendar";
import { Title } from "../../../Generic/Styles/style";
import { Wrapper } from "./style";
import useQueryHandler from "../../../hooks/useQuery";
import TableLoading from "../../../Generic/TableLoading";
import TableComponent from "./Table";
import { Button } from "antd";
import AddModal from "./AddModal";

const OTK: FC = () => {
  const useQuery = useQueryHandler();
  const format = useDateFormatter();
  const { paramsDate, idFlow } = useParams();
  const [currentData, setCurrentData] = useState<number>(Number(paramsDate));
  const [addModalOpen, setAddModalOpen] = useState(false);
  const date = new Date(currentData);
  const timeChangeHandle = (time?: number) => setCurrentData(Number(time));

  const { data, isLoading } = useQuery({
    method: "POST",
    queryLink: "/otks",
    queryKey: `${idFlow}/otk/${format(date)}`,
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
      <Title first={true}>ОТК</Title>
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
          date={date}
          idFlow={idFlow + ""}
          _dataid={
            Array.isArray(data?.data?.data[0]?.data)
              ? data?.data?.data[0]?._id
              : data?.data?.data?._id
          }
        />
      )}
      <Button
        type="primary"
        style={{
          borderRadius: "12px",
          margin: "50px 0",
        }}
        onClick={() => setAddModalOpen(true)}
      >
        + Добавить товар
      </Button>
    </Wrapper>
  );
};

export default OTK;
