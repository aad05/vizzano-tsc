import { Button } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { Wrapper } from "../../../../../Generic/Styles/style";
import { useUpdateOTKByID } from "../../../../../hooks/useQuery/useOTK";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useRedux";
import { switchSelectedData } from "../../../../../redux/otkSlice";

const NumberInuput: FC<{ _id: string; type: "fake" | "things" }> = ({
  _id,
  type,
}) => {
  const selectedData = useAppSelector((state) => state.otk.selectedData);
  const dispatch = useAppDispatch();
  const { mutate } = useUpdateOTKByID();
  const { idFlow, paramsDate } = useParams();
  const date = new Date(Number(paramsDate));

  const clickHandler = (prop: { type: "minus" | "plus" }) => {
    if (!(Number(selectedData.fake) > 1) && prop.type === "minus") return;

    if (type === "fake")
      return dispatch(
        switchSelectedData({
          ...selectedData,
          fake:
            prop.type === "minus"
              ? Number(selectedData.fake) - 1
              : Number(selectedData.fake) + 1,
        })
      );
    else
      return dispatch(
        switchSelectedData({
          ...selectedData,
          things:
            prop.type === "minus"
              ? Number(selectedData.things) - 1
              : Number(selectedData.things) + 1,
        })
      );
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "fake")
      return dispatch(
        switchSelectedData({
          ...selectedData,
          fake: Number(e.target.value) > 0 ? Number(e.target.value) : 0,
        })
      );
    else
      return dispatch(
        switchSelectedData({
          ...selectedData,
          things: Number(e.target.value) > 0 ? e.target.value : 0,
        })
      );
  };

  const keyHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) return saveHandler();
    else return;
  };

  const cancelHandler = () => dispatch(switchSelectedData({}));
  const saveHandler = () => {
    mutate({ date, idFlow, productData: selectedData, _id });
    cancelHandler();
  };

  return (
    <>
      <Wrapper.Input
        addonAfter={
          <Button onClick={() => clickHandler({ type: "plus" })}>+</Button>
        }
        addonBefore={
          <Button danger onClick={() => clickHandler({ type: "minus" })}>
            -
          </Button>
        }
        onChange={changeHandler}
        onKeyDown={keyHandler}
        type="number"
        value={type === "fake" ? selectedData.fake : selectedData.things}
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

export default NumberInuput;
