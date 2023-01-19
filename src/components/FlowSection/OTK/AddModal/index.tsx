import { Input, Modal } from "antd";
import { FC, useState } from "react";
import useNotification from "../../../../Generic/notification";
import { Wrapper } from "../../../../Generic/Styles/style";
import { useAxios } from "../../../../hooks/useAxios";
import { useAddOTKProductCache } from "../../../../hooks/useQuery/useOTK";

interface AddModalProps {
  open: boolean;
  onCancel: () => void;
  flowType: string;
  createDate: Date;
}

const AddModal: FC<AddModalProps> = ({
  open,
  onCancel,
  flowType,
  createDate,
}) => {
  const axios = useAxios();
  const [productName, setProductName] = useState("");
  const [isAddingUser, setAddingUser] = useState(false);
  const addToCache = useAddOTKProductCache();
  const notification = useNotification();

  const addProduct = async () => {
    if (!productName) {
      notification({
        type: "error",
        message: "Ошибка",
        description: "Пожалуйста заполните поля!",
        placement: "topRight",
      });
      return;
    }

    setAddingUser(true);
    try {
      const data = await axios({
        url: "/otk/add_otk_product",
        method: "POST",
        body: {
          flowType,
          createDate: createDate.getTime(),
          productName,
        },
      });
      const addProductData = data?.data?.data[0]?.data;
      addToCache({
        date: createDate,
        idFlow: flowType,
        productData: addProductData[addProductData.length - 1],
      });

      onCancel();
      setProductName("");
    } catch (error) {
      notification({
        type: "error",
        message: "Ошибка",
        description:
          "Упс! Что-то пошло не так. Пожалуйста, повторите попытку позже!",
        placement: "topRight",
      });
    }
    setAddingUser(false);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  return (
    <Modal
      open={open}
      title="Добавить участник"
      okText="Добавить"
      cancelText="Отмена"
      onCancel={isAddingUser ? () => false : onCancel}
      onOk={addProduct}
      okButtonProps={{ loading: isAddingUser }}
      cancelButtonProps={{ disabled: isAddingUser }}
    >
      <Wrapper.Form>
        <Wrapper.InputWrapper>
          <Wrapper.Label>Название:</Wrapper.Label>
          <Input
            value={productName}
            onChange={changeHandler}
            onKeyDown={(e) => e.key === "Enter" && addProduct()}
          />
        </Wrapper.InputWrapper>
      </Wrapper.Form>
    </Modal>
  );
};

export default AddModal;
