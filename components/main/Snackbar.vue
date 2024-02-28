<script setup lang="ts">
import { NotificationType, type Notification } from '~/types/notifications';

const props = defineProps<{
  notification: Notification
}>();

const { removeNotification } = useNotifications();
function removeCurrentNotification() {
  removeNotification(props.notification.id);
}
setTimeout(removeCurrentNotification, 7000);
</script>

<template>
  <div
    class="flex items-center gap-3 p-2 md:p-4 md:rounded-lg shadow-md w-full text-white"
    :class="notification?.type === NotificationType.Error ? `bg-red-500` : `bg-green-400`"
  >
    <span class="flex-1">{{ notification?.message }}</span>
    <VBtn
      icon="mdi-close"
      variant="text"
      @click="removeCurrentNotification"
    />
  </div>
</template>
