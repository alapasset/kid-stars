<script setup lang="ts">
const { t } = useI18n()

const currentFamilyMemberStore = useCurrentFamilyMemberStore()
const { currentFamilyMember } = storeToRefs(currentFamilyMemberStore)
</script>

<template>
  <MainAdmin :title="t('me.admin.title')">
    <template #form>
      <TutorEdit v-if="currentFamilyMember" :title="t('me.admin.title')" :tutor="currentFamilyMember" />
    </template>
  </MainAdmin>
</template>

