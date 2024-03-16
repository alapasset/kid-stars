<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { data: tutor, isFetched: isOnFetch } = useFetchTutorByUser()

const { t } = useI18n()
</script>

<template>
  <MainAdmin
    :is-fetched="isOnFetch"
    :title="t('me.admin.title')"
  >
    <template #form>
      <TutorEdit v-if="tutor" :title="t('me.admin.title')" :tutor />
    </template>
  </MainAdmin>
</template>
