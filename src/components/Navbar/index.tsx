import { useState } from "react";
import { Wrapper } from "./style";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { useNavigate, Outlet } from "react-router-dom";
import { Avatar, Dropdown, Modal, MenuProps } from "antd";
import { TbSettings, TbLogout } from "react-icons/tb";
import logo from "../../assets/icons/navbarLogo.png";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const signOut = useSignOut();
  const [showProfile, setShowProfile] = useState(false);

  const confirm = () => {
    Modal.confirm({
      title: "Предупреждение",
      content: "Вы действительно хотите выйти ?",
      okText: "Выйти",
      cancelText: "Отмена",
      okButtonProps: {
        style: { background: "red" },
      },
      onOk: () => {
        signOut();
        navigate("/login");
      },
    });
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <Wrapper.MenuItem onClick={() => setShowProfile(true)}>
          <TbSettings style={{ fontSize: "18px", marginRight: "10px" }} />
          <Wrapper.MenuItemText danger={false}>Настройки</Wrapper.MenuItemText>
        </Wrapper.MenuItem>
      ),
      key: "0",
    },
    {
      label: (
        <Wrapper.MenuItem onClick={() => confirm()}>
          <TbLogout
            style={{ fontSize: "18px", marginRight: "10px", color: "red" }}
          />
          <Wrapper.MenuItemText danger={true}>Выйти</Wrapper.MenuItemText>
        </Wrapper.MenuItem>
      ),
      key: "1",
    },
  ];

  const navigateHandle = () => {
    if (auth()?.flowType === "superAdmin") {
      navigate("/");
    }
  };
  return (
    <Wrapper>
      {!!showProfile && (
        <ProfileModal
          open={showProfile}
          onCancel={() => setShowProfile(false)}
        />
      )}
      <Wrapper.Container>
        <Wrapper.Logo src={logo} onClick={navigateHandle} />
        <Wrapper.ProfileWrapper>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Avatar
              style={{ background: "#f56a00", cursor: "pointer" }}
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
              }}
            >
              {auth()?.fullName[0].toUpperCase()}
            </Avatar>
          </Dropdown>
        </Wrapper.ProfileWrapper>
      </Wrapper.Container>
      <Outlet />
    </Wrapper>
  );
};

export default Navbar;
