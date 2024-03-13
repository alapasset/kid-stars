<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
</script>

<template>
  <MainAdmin
    is-fetched
    :title="t('me.admin.title')"
  >
    <template #form>
      <FamilyMemberTutorEdit :title="t('me.admin.title')" />
    </template>
  </MainAdmin>
</template>
