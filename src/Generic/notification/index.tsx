import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
type PlaceMentType =
  | "top"
  | "bottom"
  | "topRight"
  | "topLeft"
  | "bottomLeft"
  | "bottomRight";

const useNotification = () => {
  const [api] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
    placement: PlaceMentType
  ) => {
    console.log(type);

    notification[type]({
      message,
      description,
      placement,
    });
    // api[type]({
    //   message,
    //   description,
    //   placement,
    // });
  };

  return openNotificationWithIcon;
};

export default useNotification;
