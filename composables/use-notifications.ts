import { NotificationType, type Notification } from "~/types/notifications";
import { nanoid } from "nanoid";

const notifications = ref<Notification[]>([]);

function addSuccessNotification(message: string) {
  notifications.value.push({ id: nanoid(), message, type: NotificationType.Success });
}

function addErrorNotification(message: string) {
  notifications.value.push({ id: nanoid(), message, type: NotificationType.Error });
}

function removeNotification(id: string) {
  notifications.value = notifications.value.filter((n) => n.id !== id);
}

export function useNotifications() {
  return {
    notifications,
    notifySuccess: addSuccessNotification,
    notifyError: addErrorNotification,
    removeNotification
  };
}
