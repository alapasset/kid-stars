<script setup lang="ts">
import type {FamilyMember} from "~/types/family";

const props = defineProps<{
  member: FamilyMember
}>()

async function goToDashboard() {
  await navigateTo(`/family`);
}
</script>

<template>
  <h1>Hello {{ member.pseudo }} you are a Child</h1>
  <VBtn @click="goToDashboard">
    Retour à ma famille
  </VBtn>
</template>

<style scoped>

</style>
