<script setup lang="ts">
const currentMemberStore = useCurrentMemberStore()
const { currentMember } = storeToRefs(currentMemberStore)
const { t } = useI18n()
</script>

<template>
  <MainAdmin :title="t('family.admin.title')">
    <template #form>
      <MemberCreationForm
        v-if="currentMember"
        :family-id="currentMember.family"
        :title="t('family.admin.title')"
      />
    </template>

    <template #list>
      <MemberList
        v-if="currentMember"
        :family-id="currentMember.family"
      />
    </template>
  </MainAdmin>
</template>

