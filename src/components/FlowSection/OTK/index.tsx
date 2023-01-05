import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderCalendar from "../../../Generic/HeaderCalendar";
import { Wrapper } from "./style";

const OTK: FC = () => {
  const { paramsDate } = useParams();
  const [currentData, setCurrentData] = useState<number>(Number(paramsDate));
  const date = new Date(currentData);

  const timeChangeHandle = (time?: number) => setCurrentData(Number(time));
  return (
    <Wrapper>
      <Wrapper.Title first={true}>ОТК</Wrapper.Title>
      <HeaderCalendar
        onDayChange={timeChangeHandle}
        dayMinus={timeChangeHandle}
        dayPlus={timeChangeHandle}
        date={date}
      />
    </Wrapper>
  );
};

export default OTK;
