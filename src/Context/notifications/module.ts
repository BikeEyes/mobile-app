export enum NotificationTypes {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

export interface NotificationsContextProps {
  active: boolean;
  message: string;
  type: NotificationTypes;
}

export const defaultNotification: NotificationsContextProps = {
  active: false,
  message: "",
  type: NotificationTypes.success,
};
