import { FC } from "react";
import { Button } from "./style";

interface WarningButtonProp {
  children: string;
  warningAnimation: boolean;
  mt?: string;
  bgColor: string;
}

const WarningButton: FC<WarningButtonProp> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};
export default WarningButton;
