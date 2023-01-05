import { FC, useState } from "react";
import { Wrapper } from "./style";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

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
        <Wrapper.Title onClick={() => setDateShow(false)}>
          {" "}
          {date?.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </Wrapper.Title>
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
            const dateNow = new Date();
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

export default HeaderCalendar;
