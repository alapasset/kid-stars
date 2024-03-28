<script setup lang="ts">
const { t } = useI18n()
const currentMemberStore = useCurrentMemberStore()
const { currentMember } = storeToRefs(currentMemberStore)
</script>

<template>
  <MainAdmin :title="t('activity.admin.title')">
    <template #form>
      <ActivityForm
        v-if="currentMember"
        :family-id="currentMember.family"
      />
    </template>

    <template #list>
      <ActivityList
      v-if="currentMember"
      :family-id="currentMember.family"
      />
    </template>
</MainAdmin>
</template>

