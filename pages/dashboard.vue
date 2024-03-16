<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { data: families } = useFetchFamilies()

const { t } = useI18n()
</script>

<template>
  <h1 class="mb-5 text-center text-5xl">{{ t('dashboard.title') }}</h1>
  <FamilyDetail
    v-if="families?.[0]?.id"
    :family-id="families?.[0]?.id"
  />
  <TaskDashboard
    v-if="families?.[0]?.id"
    :family-id="families?.[0]?.id"
  />
</template>
