import { FC, useState } from "react";
import HeaderCalendar from "../../Generic/HeaderCalendar";
import { Title } from "../../Generic/Styles/style";
import FlowReport from "../ReportSecton/FlowReport";
import OTKReport from "../ReportSecton/OTKReport";
import Store from "../Store";
import { Wrapper } from "./style";

const Report: FC = () => {
  const [currentData, setCurrentData] = useState<number>(new Date().getTime());
  const date = new Date(currentData);

  const timeChangeHandle = (time?: number) => setCurrentData(Number(time));

  return (
    <Wrapper>
      <Title first={true}>Отчеты:</Title>
      <HeaderCalendar
        onDayChange={timeChangeHandle}
        dayMinus={timeChangeHandle}
        dayPlus={timeChangeHandle}
        date={date}
      />
      <FlowReport date={date} />
      <OTKReport date={date} />
      <Store cancelFeatures={true} />
    </Wrapper>
  );
};

export default Report;
