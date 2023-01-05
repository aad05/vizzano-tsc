import ReactDOM from "react-dom/client";
import UseWrapper from "./hooks/useWrapper";
import Root from "./root";
import "antd/dist/reset.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UseWrapper>
    <Root />
  </UseWrapper>
);
