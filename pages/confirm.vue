<script setup lang="ts">
const user = useSupabaseUser()
const { t } = useI18n()

watch(user, async () => {
  if (user.value) await navigateTo('/current-family-member')
// eslint-disable-next-line @typescript-eslint/naming-convention
}, { immediate: true })
</script>

<template>
  <div>
    {{ t('common.redirect') }}
  </div>
</template>
