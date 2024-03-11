<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
</script>

<template>
  <h1>{{ t('dashboard.title') }}</h1>
</template>
