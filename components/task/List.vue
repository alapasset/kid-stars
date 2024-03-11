<script setup lang="ts">
const props = defineProps<{ familyId: string }>()
const { t } = useI18n()
const familyId = toRef(props, 'familyId')
const { data: tasks, isFetched } = useFetchTasksByFamily(familyId)
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
            {{ task.familyMember.pseudo }}
          </td>
          <td>
            {{ task.points }}
          </td>
          <td>
            {{ task.child || t('task.admin.not-done') }}
          </td>
          <td>
            <Icon
              class="size-6"
              name="material-symbols:settings-rounded"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-center">
    <span class="loading loading-dots loading-lg" />
  </div>
</template>
