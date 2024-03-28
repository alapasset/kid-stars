<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
    'members',
  ],
})

const currentMemberStore = useCurrentMemberStore()
const { currentMember: member } = storeToRefs(currentMemberStore)

const { t } = useI18n()
</script>

<template>
  <h1 class="mb-5 text-center text-5xl">{{ t('dashboard.title') }}</h1>
  <FamilyDetail
    v-if="member"
    :family-id="member?.family"
  />
  <TaskDashboard
    v-if="member"
    :current-member="member"
  />
  <ActivityDashboard
    v-if="member"
    :current-member="member"
  />
</template>

