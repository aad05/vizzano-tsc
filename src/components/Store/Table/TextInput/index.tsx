import { Button } from "antd";
import { FC } from "react";
import useNotification from "../../../../Generic/notification";
import { Wrapper } from "../../../../Generic/Styles/style";
import { useUpdateStoreByID } from "../../../../hooks/useQuery/useStore";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { switchSelectedData } from "../../../../redux/storeSlice";

const TextInput: FC = () => {
  const notification = useNotification();
  const selectedData = useAppSelector((state) => state.store.selectedData);
  const dispatch = useAppDispatch();
  const { mutate } = useUpdateStoreByID();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      switchSelectedData({
        ...selectedData,
        productName: e.target.value,
      })
    );
  };
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

    mutate({ productData: selectedData });
    cancelHandler();
  };

  const cancelHandler = () => dispatch(switchSelectedData({}));

  return (
    <>
      <Wrapper.Input
        onChange={changeHandler}
        value={selectedData.productName}
        onKeyDown={keyHandler}
      />
      <Wrapper.ActionWrapper>
        <Button type="primary">Сохранять</Button>
        <Button onClick={cancelHandler}>Отмена</Button>
      </Wrapper.ActionWrapper>
    </>
  );
};

export default TextInput;
