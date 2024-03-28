<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
    'members',
  ],
})
const currentMemberStore = useCurrentMemberStore()
const { currentMember: member } = storeToRefs(currentMemberStore)
</script>

<template>
  <div>
    <ProfileMain v-if="member" :current-member="member"/>
  </div>
</template>
