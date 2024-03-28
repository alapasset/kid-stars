<script setup lang="ts">
const { t } = useI18n()

const currentMemberStore = useCurrentMemberStore()
const { currentMember } = storeToRefs(currentMemberStore)
</script>

<template>
  <MainAdmin :title="t('avatar.admin.title')">
    <template #form>
      <AvatarForm
        v-if="currentMember"
        :tutor-id="currentMember.id"
      />
    </template>
</MainAdmin>
</template>

