<script setup lang="ts">
import type { Task } from '~/types/task'

const props = defineProps<{
  familyId: string
}>()

const familyId = toRef(props, 'familyId')

const { t } = useI18n()

const { data: tasks, isFetched } = useFetchTasksByFamily(familyId)
function canBeValidated (task: Task) {
  return task.status === 'toBeValidated'
}
</script>

<template>
  <div v-if="isFetched">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>{{ t('common.name') }}</th>
          <th>{{ t('common.description') }}</th>
          <th>{{ t('common.creator') }}</th>
          <th>{{ t('common.points') }}</th>
          <th>{{ t('common.child') }}</th>
          <th>{{ t('common.status') }}</th>
          <th>{{ t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in tasks"
          :key="task?.id"
        >
          <td>
            {{ task.name }}
          </td>
          <td>
            {{ task.description }}
          </td>
          <td>
            {{ task.tutor.pseudo }}
          </td>
          <td>
            {{ task.points }}
          </td>
          <td>
            {{ task.child?.pseudo }}
          </td>
          <td>
            {{ t(`task.status.${task.status }`) }}
          </td>
          <td class="flex gap-3">
            <TaskEdit :task />
            <TaskDelete :task />
            <TaskValidation v-if="canBeValidated(task)" :task />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-center">
    <span class="loading loading-dots loading-lg" />
  </div>
</template>
