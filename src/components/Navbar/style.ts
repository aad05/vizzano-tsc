import styled from "styled-components";
import { Menu } from "antd";

export const Wrapper: any = styled.div`
  width: 100%;
  height: 100%;
`;
Wrapper.Container = styled.div`
  background: #fff;
  width: 100%;
  padding: 0 10%;
  height: 70px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
Wrapper.Logo = styled.img`
  cursor: pointer;
  width: 102px;
  height: 100%;
  @media (max-width: 600px) {
    width: 102px;
    height: 100%;
  }
`;
Wrapper.ProfileWrapper = styled.div``;
Wrapper.ProfileWrapper.Img = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 36px;
    height: 36px;
  }
`;
Wrapper.Menu = styled(Menu)`
  .ant-dropdown-menu {
    border-radius: 12px;
  }
  .dropdown {
    display: flex;
    align-items: center;
  }
`;
Wrapper.MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
`;
Wrapper.MenuItemText = styled.div<{ danger: boolean }>`
  width: 100%;
  color: ${({ danger }) => (danger ? "red" : "#000")};
`;
