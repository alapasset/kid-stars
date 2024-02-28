export enum NotificationType {
  Success = `success`,
  Error = `error`,
}

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}
