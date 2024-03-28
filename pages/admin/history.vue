<script setup lang="ts">
const currentMemberStore = useCurrentMemberStore()
const { currentMember } = storeToRefs(currentMemberStore)

const { t } = useI18n()
</script>

<template>
  <MainAdmin :title="t('history.admin.title')">
    <template #list>
      <HistoryList
        v-if="currentMember"
        :family-id="currentMember.family"
      />
    </template>
  </MainAdmin>
</template>

