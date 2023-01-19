import { Button } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";
import useNotification from "../../../../../Generic/notification";
import { Wrapper } from "../../../../../Generic/Styles/style";
import { useChangeCountWork } from "../../../../../hooks/useQuery/useCountWork";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useRedux";
import { switchSelectedData } from "../../../../../redux/countWorkSlice";

const TextInput: FC<{ _id: string }> = ({ _id }) => {
  const notification = useNotification();
  const selectedData = useAppSelector((state) => state.countWork.selectedData);
  const dispatch = useAppDispatch();
  const { mutate } = useChangeCountWork();
  const { idFlow, paramsDate } = useParams();
  const date = new Date(Number(paramsDate));

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      switchSelectedData({
        ...selectedData,
        fullName: e.target.value,
      })
    );
  };
  const cancelHandler = () => dispatch(switchSelectedData({}));

  const keyHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) return saveHandler();
    else return;
  };

  const saveHandler = () => {
    if (!selectedData.fullName)
      return notification({
        type: "error",
        message: "Ошибка",
        description: "Пожалуйста заполните поля!",
        placement: "topRight",
      });

    mutate({ date, idFlow, userData: selectedData, _id });
    cancelHandler();
  };

  return (
    <>
      <Wrapper.Input
        onKeyDown={keyHandler}
        onChange={changeHandler}
        value={selectedData.fullName}
      />
      <Wrapper.ActionWrapper>
        <Button type="primary" onClick={saveHandler}>
          Сохранять
        </Button>
        <Button onClick={cancelHandler}>Отмена</Button>
      </Wrapper.ActionWrapper>
    </>
  );
};

export default TextInput;
