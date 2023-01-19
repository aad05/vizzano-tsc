import { Input, Modal } from "antd";
import { FC, useState } from "react";
import useNotification from "../../../Generic/notification";
import { Wrapper } from "../../../Generic/Styles/style";
import { useAxios } from "../../../hooks/useAxios";
import { useAddStoreProductCache } from "../../../hooks/useQuery/useStore";

interface AddModalProps {
  open: boolean;
  onCancel: () => void;
}

const AddModal: FC<AddModalProps> = ({ open, onCancel }) => {
  const axios = useAxios();
  const [productName, setProductName] = useState("");
  const [isAddingUser, setAddingUser] = useState(false);
  const addToCache = useAddStoreProductCache();
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
        url: "/store/create",
        method: "POST",
        body: {
          productName,
        },
      });
      const addProductData = data?.data?.data;

      addToCache({ productData: addProductData[addProductData.length - 1] });

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
