import { NotificationType, type GlobalNotification } from '~/types/notifications'
import { nanoid } from 'nanoid'

const notifications = ref<GlobalNotification[]>([])

function addSuccessNotification (message: string) {
  notifications.value.push({ id: nanoid(), message, type: NotificationType.IsSuccess })
}

function addErrorNotification (message: string) {
  notifications.value.push({ id: nanoid(), message, type: NotificationType.IsError })
}

function removeNotification (id: string) {
  notifications.value = notifications.value.filter((notification) => notification.id !== id)
}

export function useNotifications () {
  return {
    notifications,
    notifySuccess: addSuccessNotification,
    notifyError: addErrorNotification,
    removeNotification,
  }
}
