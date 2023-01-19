import { Button } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";
import useNotification from "../../../../../Generic/notification";
import { Wrapper } from "../../../../../Generic/Styles/style";
import { useUpdateOTKByID } from "../../../../../hooks/useQuery/useOTK";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useRedux";
import { switchSelectedData } from "../../../../../redux/otkSlice";

const TextInput: FC<{ _id: string }> = ({ _id }) => {
  const notification = useNotification();
  const selectedData = useAppSelector((state) => state.otk.selectedData);
  const dispatch = useAppDispatch();
  const { mutate } = useUpdateOTKByID();
  const { idFlow, paramsDate } = useParams();
  const date = new Date(Number(paramsDate));

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      switchSelectedData({
        ...selectedData,
        productName: e.target.value,
      })
    );
  };
  const cancelHandler = () => dispatch(switchSelectedData({}));
  const keyHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) return saveHandler();
    else return;
  };
  const saveHandler = () => {
    if (!selectedData.productName)
      return notification({
        type: "error",
        message: "Ошибка",
        description: "Пожалуйста заполните поля!",
        placement: "topRight",
      });

    mutate({ date, idFlow, productData: selectedData, _id });
    cancelHandler();
  };

  return (
    <>
      <Wrapper.Input
        onChange={changeHandler}
        value={selectedData.productName}
        onKeyDown={keyHandler}
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
