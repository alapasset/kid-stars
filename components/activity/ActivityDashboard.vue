<script setup lang="ts">
const props = defineProps<{
  familyId:string
}>()

const familyId = toRef(props, 'familyId')

const { t } = useI18n()

const { data: activities, isFetched } = useFetchActivitiesByFamily(familyId)
</script>

<template>
  <div v-if="isFetched">
    <h1 class="mt-8 text-center text-4xl">{{ t('activity.dashboard.title') }}</h1>
    <div class="grid grid-cols-1 gap-4 p-10 sm:grid-cols-3">
      <ActivityCard v-for="activity in activities" :key="activity.id" :activity />
    </div>
  </div>
  <div v-else class="text-center">
    <span class="loading loading-dots loading-lg" />
  </div>
</template>
