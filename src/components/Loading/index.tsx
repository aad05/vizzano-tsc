import { FC } from "react";
import { Wrapper } from "./style";
import { LoadingOutlined } from "@ant-design/icons";

const Loading: FC = () => {
  return (
    <Wrapper>
      <LoadingOutlined style={{ fontSize: "5vh", marginBottom: "30px" }} />
      <Wrapper.Title>Загрузка страница...</Wrapper.Title>
    </Wrapper>
  );
};

export default Loading;
