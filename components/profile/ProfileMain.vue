<script setup lang="ts">
import type { FamilyMember } from '~/types/member.js'

const props = defineProps<{
  currentMember: FamilyMember
}>()
const currentFamilyMember = toRef(props, 'currentMember')
</script>

<template>
  <h1>Hello World</h1>
  <ProfileHistory :current-member="currentFamilyMember" />
</template>
