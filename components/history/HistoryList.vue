<script setup lang="ts">
const props = defineProps<{
  familyId: string
}>()

const familyId = toRef(props, 'familyId')

const { t } = useI18n()

const { isFetched, data: points } = useFetchPointByFamily(familyId.value)
</script>

<template>
  <div v-if="isFetched">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>{{ t('common.tutor') }}</th>
          <th>{{ t('common.child') }}</th>
          <th>{{ t('common.task') }}</th>
          <th>{{ t('common.activity') }}</th>
          <th>{{ t('common.points') }}</th>
          <th>{{ t('common.date') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="point in points"
          :key="point?.id"
        >
          <td>{{ point.tutor.pseudo }}</td>
          <td>{{ point.child.pseudo }}</td>
          <td>{{ point.task?.name }}</td>
          <td>{{ point.activity?.name }}</td>
          <td>{{ point.points }}</td>
          <td>{{ new Date(point.createdAt).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-center">
    <span class="loading loading-dots loading-lg" />
  </div>
</template>
