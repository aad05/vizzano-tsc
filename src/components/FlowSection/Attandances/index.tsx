import { FC, useState } from "react";
import { Wrapper } from "./style";
import HeaderCalendar from "../../../Generic/HeaderCalendar";
import { useParams } from "react-router-dom";

const Attandances: FC = () => {
  const { paramsDate } = useParams();
  const [currentData, setCurrentData] = useState<number>(Number(paramsDate));
  const date = new Date(currentData);

  const timeChangeHandle = (time?: number) => setCurrentData(Number(time));

  return (
    <Wrapper>
      <Wrapper.Title first={true}>Посещаемость</Wrapper.Title>
      <HeaderCalendar
        onDayChange={timeChangeHandle}
        dayMinus={timeChangeHandle}
        dayPlus={timeChangeHandle}
        date={date}
      />
    </Wrapper>
  );
};

export default Attandances;
