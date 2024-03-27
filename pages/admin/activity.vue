<script setup lang="ts">
const { t } = useI18n()
const currentFamilyMemberStore = useCurrentFamilyMemberStore()
const { currentFamilyMember } = storeToRefs(currentFamilyMemberStore)
</script>

<template>
  <MainAdmin :title="t('activity.admin.title')">
    <template #form>
      <ActivityForm
        v-if="currentFamilyMember"
        :family-id="currentFamilyMember.family"
      />
    </template>

    <template #list>
      <ActivityList
      v-if="currentFamilyMember"
      :family-id="currentFamilyMember.family"
      />
    </template>
</MainAdmin>
</template>

