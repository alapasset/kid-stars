<script setup lang="ts">
const currentFamilyMemberStore = useCurrentFamilyMemberStore()
const { currentFamilyMember } = storeToRefs(currentFamilyMemberStore)

const { t } = useI18n()
</script>

<template>
  <MainAdmin :title="t('task.admin.title')">
    <template #form>
      <TaskForm
        v-if="currentFamilyMember"
        :family-id="currentFamilyMember.family"
        :tutor-id="currentFamilyMember.id"
      />
    </template>

    <template #list>
      <TaskList
        v-if="currentFamilyMember"
        :family-id="currentFamilyMember.family"
      />
    </template>
  </MainAdmin>
</template>

