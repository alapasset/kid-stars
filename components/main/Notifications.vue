<script setup lang="ts">
const { notifications } = useNotifications();
</script>

<template>
  <aside class="fixed bottom-0 md:bottom-2 inset-x-0 md:left-auto md:right-2 z-100">
    <TransitionGroup
      name="snackbar"
      class="flex flex-col md:gap-3"
      tag="div"
      enter-active-class="transition-all ease-in-out duration-500"
      leave-active-class="transition-all ease-in-out duration-500"
      move-class="transition-all ease-in-out duration-500"
      enter-from-class="opacity-0 translate-y-0"
      leave-to-class="opacity-0 translate-y-0"
    >
      <MainSnackbar
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </TransitionGroup>
  </aside>
</template>
