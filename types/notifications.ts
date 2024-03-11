export enum NotificationType {
  IsError = 'error',
  IsSuccess = 'success',
}

export interface GlobalNotification {
  id: string
  message: string
  type: NotificationType
}
