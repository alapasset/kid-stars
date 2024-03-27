<script setup lang="ts">
const currentFamilyMemberStore = useCurrentFamilyMemberStore()
const { currentFamilyMember } = storeToRefs(currentFamilyMemberStore)

const { t } = useI18n()
</script>

<template>
  <MainAdmin :title="t('history.admin.title')">
    <template #list>
      <HistoryList
        v-if="currentFamilyMember"
        :family-id="currentFamilyMember.family"
      />
    </template>
  </MainAdmin>
</template>

