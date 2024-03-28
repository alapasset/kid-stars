<script setup lang="ts">
const { t } = useI18n()

const currentMemberStore = useCurrentMemberStore()
const { currentMember } = storeToRefs(currentMemberStore)
</script>

<template>
  <MainAdmin :title="t('me.admin.title')">
    <template #form>
      <TutorEdit v-if="currentMember" :title="t('me.admin.title')" :tutor="currentMember" />
    </template>
  </MainAdmin>
</template>

