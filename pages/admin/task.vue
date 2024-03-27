<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
    'members',
  ],
})

const { data: families, isFetched: isFetchedFamilies } = useFetchFamilies()
const { data: tutor, isFetched: isFetchedTutor } = useFetchTutorByUser()

const { t } = useI18n()

const myFirstFamily = computed(() => families.value?.[0]?.id)
const isOnFetch = computed(() => isFetchedFamilies.value && isFetchedTutor.value)
</script>

<template>
  <MainAdmin
    :is-fetched="isOnFetch"
    :title="t('task.admin.title')"
  >
    <template #form>
      <TaskForm
        v-if="myFirstFamily && tutor"
        :family-id="myFirstFamily"
        :tutor-id="tutor?.id"
      />
    </template>

    <template #list>
      <TaskList
        v-if="myFirstFamily"
        :family-id="myFirstFamily"
      />
    </template>
  </MainAdmin>
</template>
