<script setup lang="ts">
const currentFamilyMemberStore = useCurrentFamilyMemberStore()
const { currentFamilyMember } = storeToRefs(currentFamilyMemberStore)
const { t } = useI18n()
</script>

<template>
  <MainAdmin :title="t('family.admin.title')">
    <template #form>
      <MemberCreationForm
        v-if="currentFamilyMember"
        :family-id="currentFamilyMember.family"
        :title="t('family.admin.title')"
      />
    </template>

    <template #list>
      <MemberList
        v-if="currentFamilyMember"
        :family-id="currentFamilyMember.family"
      />
    </template>
  </MainAdmin>
</template>

