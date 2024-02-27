<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class=" flex items-center border-t-2 border-gray-100 h-16 justify-center">
    <span>{{ t('footer.terms') }}</span>
  </footer>
</template>
