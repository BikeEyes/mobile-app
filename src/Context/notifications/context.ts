import { Dispatch, SetStateAction, createContext } from "react";
import { NotificationsContextProps } from "./module";

export const NotificationContext = createContext({
  notification: {} as NotificationsContextProps,
  setNotification: {} as Dispatch<SetStateAction<NotificationsContextProps>>,
});
