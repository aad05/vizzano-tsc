import { FC } from "react";
import { Modal, Avatar, Input, Typography } from "antd";
import { Wrapper } from "./style";
import { useAuthUser } from "react-auth-kit";
const { Text } = Typography;

interface ProfileModalProp {
  onCancel: () => void;
  open: boolean;
}

const ProfileModal: FC<ProfileModalProp> = ({ onCancel, open }) => {
  const auth = useAuthUser();
  return (
    <Wrapper>
      <Modal
        open={open}
        onCancel={onCancel}
        title="Профиль"
        okText="Сохранять"
        okButtonProps={{
          disabled: true,
        }}
      >
        <Wrapper.ModalContainer>
          <Avatar
            style={{ background: "#f56a00" }}
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
          >
            A
          </Avatar>
          <Wrapper.Form>
            <Wrapper.InputWrapper>
              <Wrapper.Label>Имя:</Wrapper.Label>
              <Input
                disabled={true}
                value={auth()?.fullName[0].split(" ")[0]}
              />
            </Wrapper.InputWrapper>
            <Wrapper.InputWrapper>
              <Wrapper.Label>Фамилия:</Wrapper.Label>
              <Input value={auth()?.fullName.split(" ")[1]} disabled={true} />
            </Wrapper.InputWrapper>
          </Wrapper.Form>
          <Text style={{ marginTop: 20 }} type="secondary">
            Vizzano 0.0.1 version
          </Text>
        </Wrapper.ModalContainer>
      </Modal>
    </Wrapper>
  );
};

export default ProfileModal;
