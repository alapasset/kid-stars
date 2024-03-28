<script setup lang="ts">
const currentMemberStore = useCurrentMemberStore()
const { currentMember } = storeToRefs(currentMemberStore)

const { t } = useI18n()
</script>

<template>
  <MainAdmin :title="t('task.admin.title')">
    <template #form>
      <TaskForm
        v-if="currentMember"
        :family-id="currentMember.family"
        :tutor-id="currentMember.id"
      />
    </template>

    <template #list>
      <TaskList
        v-if="currentMember"
        :family-id="currentMember.family"
      />
    </template>
  </MainAdmin>
</template>

