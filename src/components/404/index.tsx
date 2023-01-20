import { useNavigate } from "react-router-dom";
import { Wrapper } from "./style";

const NotFound = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <Wrapper.BG />
      <Wrapper.TextSection>
        <Wrapper.Title>404</Wrapper.Title>
        <Wrapper.Text bold={true}>Упс, ты потерялся в космосе</Wrapper.Text>
        <Wrapper.Text>
          Мы не можем найти страницу, которую вы ищете
        </Wrapper.Text>
        <Wrapper.Btn onClick={backHome}>Перейти к домой</Wrapper.Btn>
      </Wrapper.TextSection>
      <Wrapper.Blob />
    </Wrapper>
  );
};

export default NotFound;
