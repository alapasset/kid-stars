<script setup lang="ts">
import type { FamilyMember } from '~/types/member.js'

const props = defineProps<{
  currentMember: FamilyMember
}>()

const currentFamilyMember = toRef(props, 'currentMember')

const { t } = useI18n()

const { data: tasks, isFetched } = useFetchTasksByFamily(currentFamilyMember.value.family)
</script>

<template>
  <div v-if="isFetched">
    <h1 class="mt-8 text-center text-4xl">{{ t('task.dashboard.title') }}</h1>
    <div class="grid grid-cols-1 gap-4 p-10 sm:grid-cols-3">
      <TaskCard
      v-for="task in tasks"
       :key="task.id"
       :current-member="currentFamilyMember"
       :task
       />
    </div>
  </div>
  <div v-else class="text-center">
    <span class="loading loading-dots loading-lg" />
  </div>
</template>
