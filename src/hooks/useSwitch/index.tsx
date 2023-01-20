import { useNavigate } from "react-router-dom";

const useSwitch = () => {
  const navigate = useNavigate();
  return (userType: string) => {
    switch (userType) {
      case "superAdmin":
        return navigate("/report");
      case "1":
        return navigate("/flow/1");
      case "2":
        return navigate("/flow/2");
      case "3":
        return navigate("/flow/3");
      case "4":
        return navigate("/flow/4");
      case "5":
        return navigate("/flow/5");
      case "store":
        return navigate("/store");
      case "otk":
        return navigate("/otk");
    }
  };
};

export { useSwitch };
