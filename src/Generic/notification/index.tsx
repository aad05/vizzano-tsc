import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
type PlaceMentType =
  | "top"
  | "bottom"
  | "topRight"
  | "topLeft"
  | "bottomLeft"
  | "bottomRight";

interface NotificationProp {
  type: NotificationType;
  message: string;
  description: string;
  placement: PlaceMentType;
}

const useNotification = () => {
  const openNotificationWithIcon = (data: NotificationProp) => {
    notification[data.type]({
      ...data,
    });
  };

  return openNotificationWithIcon;
};

export default useNotification;
