import { Input, Modal } from "antd";
import { FC, useState } from "react";
import useNotification from "../../../../Generic/notification";
import { Wrapper } from "../../../../Generic/Styles/style";
import { useAxios } from "../../../../hooks/useAxios";
import { useAddUserToCache } from "../../../../hooks/useQuery/useAttandance";

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
  const [userData, setUserData] = useState({ name: "", surName: "" });
  const [isAddingUser, setAddingUser] = useState(false);
  const addToCache = useAddUserToCache();
  const notification = useNotification();

  const addUser = async () => {
    if (!userData.name || !userData.surName) {
      notification({
        type: "error",
        message: "Ошибка",
        description: "Пожалуйста заполните все поля!",
        placement: "topRight",
      });
      return;
    }

    setAddingUser(true);
    try {
      const data = await axios({
        url: "/merchants/create_user",
        method: "POST",
        body: {
          flowType,
          createDate: createDate.getTime(),
          fullName: `${userData.name} ${userData.surName}`,
        },
      });
      const addUserData = data?.data?.data[0]?.data;
      addToCache({
        date: createDate,
        idFlow: flowType,
        userData: addUserData[addUserData.length - 1],
      });

      onCancel();
      setUserData({ name: "", surName: "" });
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
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      open={open}
      title="Добавить участник"
      okText="Добавить"
      cancelText="Отмена"
      onCancel={isAddingUser ? () => false : onCancel}
      onOk={addUser}
      okButtonProps={{ loading: isAddingUser }}
      cancelButtonProps={{ disabled: isAddingUser }}
    >
      <Wrapper.Form>
        <Wrapper.InputWrapper>
          <Wrapper.Label>Имя:</Wrapper.Label>
          <Input value={userData.name} onChange={changeHandler} name="name" />
        </Wrapper.InputWrapper>
        <Wrapper.InputWrapper>
          <Wrapper.Label>Фамилия:</Wrapper.Label>
          <Input
            value={userData.surName}
            onChange={changeHandler}
            name="surName"
            onKeyDown={(e) => e.key === "Enter" && addUser()}
          />
        </Wrapper.InputWrapper>
      </Wrapper.Form>
    </Modal>
  );
};

export default AddModal;
