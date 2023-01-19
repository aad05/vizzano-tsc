import { Button } from "antd";
import { FC } from "react";
import { Wrapper } from "../../../../Generic/Styles/style";
import { useUpdateStoreByID } from "../../../../hooks/useQuery/useStore";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { switchSelectedData } from "../../../../redux/storeSlice";

const NumberInuput: FC<{ type: "sendedThings" | "things" }> = ({ type }) => {
  const selectedData = useAppSelector((state) => state.store.selectedData);
  const dispatch = useAppDispatch();
  const { mutate } = useUpdateStoreByID();

  const clickHandler = (prop: { type: "minus" | "plus" }) => {
    if (type === "things")
      return dispatch(
        switchSelectedData({
          ...selectedData,
          things:
            prop.type === "minus"
              ? Number(selectedData.things) - 1
              : Number(selectedData.things) + 1,
        })
      );
    else
      return dispatch(
        switchSelectedData({
          ...selectedData,
          sendedThings:
            prop.type === "minus"
              ? Number(selectedData.sendedThings) - 1
              : Number(selectedData.sendedThings) + 1,
        })
      );
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "things")
      return dispatch(
        switchSelectedData({
          ...selectedData,
          things: Number(e.target.value) > 0 ? Number(e.target.value) : 0,
        })
      );
    else
      return dispatch(
        switchSelectedData({
          ...selectedData,
          sendedThings: Number(e.target.value) > 0 ? e.target.value : 0,
        })
      );
  };

  const keyHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) return saveHandler();
    else return;
  };

  const cancelHandler = () => dispatch(switchSelectedData({}));
  const saveHandler = () => {
    "I'm working";
    mutate({ productData: selectedData });
    cancelHandler();
  };

  return (
    <>
      <Wrapper.Input
        addonAfter={
          <Button onClick={() => clickHandler({ type: "plus" })}>+</Button>
        }
        addonBefore={
          <Button onClick={() => clickHandler({ type: "minus" })} danger>
            -
          </Button>
        }
        type="number"
        value={
          type === "sendedThings"
            ? selectedData.sendedThings
            : selectedData.things
        }
        onChange={changeHandler}
        onKeyDown={keyHandler}
      />
      <Wrapper.ActionWrapper>
        <Button onClick={saveHandler} type="primary">
          Сохранять
        </Button>
        <Button onClick={cancelHandler}>Отмена</Button>
      </Wrapper.ActionWrapper>
    </>
  );
};

export default NumberInuput;
