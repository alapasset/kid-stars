<script setup lang="ts">
const { t } = useI18n()

const currentFamilyMemberStore = useCurrentFamilyMemberStore()
const { currentFamilyMember } = storeToRefs(currentFamilyMemberStore)
</script>

<template>
  <MainAdmin :title="t('avatar.admin.title')">
    <template #form>
      <AvatarForm
        v-if="currentFamilyMember"
        :tutor-id="currentFamilyMember.id"
      />
    </template>
</MainAdmin>
</template>

