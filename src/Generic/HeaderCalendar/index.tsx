import { FC, useState } from "react";
import { Wrapper } from "./style";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Title } from "../Styles/style";

interface HeaderCalendarProps {
  dayMinus: (time?: number) => void;
  dayPlus?: (time?: number) => void;
  onDayChange?: (time?: number) => void;
  date?: any;
}

const HeaderCalendar: FC<HeaderCalendarProps> = ({
  dayMinus,
  dayPlus,
  date,
  onDayChange,
}) => {
  const [isDateShow, setDateShow] = useState<boolean>(true);
  const dateNow = new Date();
  const startDate = new Date(1668970800000).getTime();
  const handleMinusDay = () => dayMinus?.(date?.setDate(date?.getDate() - 1));
  const handlePlusDay = () => dayPlus?.(date?.setDate(date?.getDate() + 1));

  return (
    <Wrapper>
      {date?.getTime() > startDate && (
        <BsFillCaretLeftFill
          onClick={handleMinusDay}
          style={{ cursor: "pointer" }}
        />
      )}
      {isDateShow ? (
        <Title onClick={() => setDateShow(false)}>
          {" "}
          {date?.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </Title>
      ) : (
        <Wrapper.DatePicker
          open={!isDateShow}
          onOpenChange={(e: boolean) => {
            setDateShow(!e);
          }}
          onSelect={(selectedDate: any) =>
            onDayChange?.(new Date(Number(selectedDate.$d))?.getTime())
          }
          disabledDate={(value: any) => {
            const antdDate = new Date(value.$d);
            if (
              dateNow.getTime() > antdDate.getTime() &&
              antdDate.getTime() >= startDate
            )
              return false;

            return true;
          }}
        />
      )}
      {date?.getDate() !== dateNow.getDate() && (
        <BsFillCaretRightFill
          onClick={handlePlusDay}
          style={{ cursor: "pointer" }}
        />
      )}
    </Wrapper>
  );
};

export const useDateFormatter = () => {
  return (date: Date) =>
    date?.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
};

export default HeaderCalendar;
