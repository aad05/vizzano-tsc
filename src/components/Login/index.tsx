import { FC, useState } from "react";
import ShapeSvg from "../../Generic/ShapeSVG";
import { Wrapper } from "./style";
import { LoadingOutlined } from "@ant-design/icons";
import { useAxios } from "../../hooks/useAxios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import logoGif from "../../assets/images/logo.gif";
import useNotification from "../../Generic/notification";

interface UserInput {
  fullName: string;
  password: string;
}

const Login: FC = () => {
  const axios = useAxios();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const notification = useNotification();
  const [warningAnimation, setWarningAnimation] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<UserInput>({
    fullName: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const playWarningAnim = () => {
    setWarningAnimation(true);
    setTimeout(() => {
      setWarningAnimation(false);
    }, 1000);
  };
  const handleAuth: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.keyCode === 13 || e.type === "click") onAuth();
    else return;
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onAuth = async () => {
    if (!userInput.fullName || !userInput.password) {
      playWarningAnim();
      notification("error", "Error", "Please fill all fields!", "topRight");
      return;
    }
    try {
      setLoading(true);
      const data = await axios({
        url: "/user/login",
        method: "POST",
        body: userInput,
      });
      const { data: recievedData } = data?.data;
      const { flowType, fullName } = recievedData.user;
      signIn({
        token: recievedData?.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { flowType, fullName },
      });
      navigate("/");
      setLoading(false);
    } catch (error) {}
  };

  return (
    <Wrapper>
      <Wrapper.Left>
        <ShapeSvg
          top={"0"}
          right={"0"}
          firstColor={"#376dd2"}
          secondColor={"#39acea"}
        />
        <Wrapper.BackgroundImage imgUrl={logoGif} />
        <ShapeSvg
          bottom={"0"}
          left={"0"}
          firstColor={"#376dd2"}
          secondColor={"#39acea"}
        />
      </Wrapper.Left>
      <Wrapper.Right>
        <Wrapper.Right.Container>
          <Wrapper.Logo src={logo} alt="logo" />
          <Wrapper.Title>И снова здравствуйте!</Wrapper.Title>
          <Wrapper.Description>
            Каждый день мы стараемся шить с лучшими для вас &#128522;. Vizzano с
            вами более 10 лет. &#128526; &#128579;
          </Wrapper.Description>
          <Wrapper.Input
            value={userInput.fullName}
            onChange={changeHandler}
            name="fullName"
            placeholder="Имя"
          />
          <Wrapper.InputPassword
            value={userInput.password}
            onChange={changeHandler}
            onKeyDown={handleAuth}
            name="password"
            placeholder="Пароль"
          />

          <Wrapper.Scanner
            onClick={handleAuth}
            warningAnimation={warningAnimation}
            login
          >
            {loading ? <LoadingOutlined /> : "Login"}
          </Wrapper.Scanner>
        </Wrapper.Right.Container>
      </Wrapper.Right>
    </Wrapper>
  );
};
export default Login;
