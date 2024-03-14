<script setup lang="ts">
const props = defineProps<{ familyId:string }>()
const familyId = toRef(props, 'familyId')
const { t } = useI18n()

const { data: tasks, isFetched } = useFetchTasksByFamily(familyId)
</script>

<template>
  <div v-if="isFetched">
    <h1 class="mt-8 text-center text-4xl">{{ t('task.dashboard.title') }}</h1>
    <div class="grid grid-cols-1 gap-4 p-10 sm:grid-cols-3">
      <TaskItem v-for="task in tasks" :key="task.id" :task />
    </div>
  </div>
  <div v-else class="text-center">
    <span class="loading loading-dots loading-lg" />
  </div>
</template>
