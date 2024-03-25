<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
const { t } = useI18n()
const { data: tutor, isFetched: isFetchedTutor } = useFetchTutorByUser()
</script>

<template>
  <MainAdmin
    :is-fetched="isFetchedTutor"
    :title="t('avatar.admin.title')"
    >
    <template #form>
      <AvatarForm
        v-if="tutor"
        :tutor-id="tutor.id"
      />
    </template>
</MainAdmin>
</template>
