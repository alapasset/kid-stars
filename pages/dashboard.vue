<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
    'members',
  ],
})

const currentFamilyMemberStore = useCurrentFamilyMemberStore()
const { currentFamilyMember } = storeToRefs(currentFamilyMemberStore)

const { t } = useI18n()
</script>

<template>
  <h1 class="mb-5 text-center text-5xl">{{ t('dashboard.title') }}</h1>
  <FamilyDetail
    v-if="currentFamilyMember"
    :family-id="currentFamilyMember?.family"
  />
  <TaskDashboard
    v-if="currentFamilyMember"
    :family-id="currentFamilyMember?.family"
  />
  <ActivityDashboard
    v-if="currentFamilyMember"
    :family-id="currentFamilyMember?.family"
  />
</template>

