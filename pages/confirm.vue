<script setup lang="ts">
const user = useSupabaseUser()
const { t } = useI18n()

watch(user, () => {
  if (user.value) {
    return navigateTo(`/dashboard`)
  }
}, { immediate: true })
</script>

<template>
  <div>
    {{ t('common.redirect') }}
  </div>
</template>
