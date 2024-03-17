<script setup lang="ts">
const props = defineProps<{
  familyId: string
}>()

const familyId = toRef(props, 'familyId')

const { t } = useI18n()

const { data: activities, isFetched } = useFetchActivitiesByFamily(familyId)
</script>

<template>
  <div v-if="isFetched">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>{{ t('common.name') }}</th>
          <th>{{ t('common.description') }}</th>
          <th>{{ t('common.points') }}</th>
          <th>{{ t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="activity in activities"
          :key="activity?.id"
        >
          <td>
            {{ activity.name }}
          </td>
          <td>
            {{ activity.description }}
          </td>
          <td>
            {{ activity.points }}
          </td>
          <td class="flex gap-3">
            <ActivityEdit :activity />
            <ActivityDelete :activity />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-center">
    <span class="loading loading-dots loading-lg" />
  </div>
</template>
