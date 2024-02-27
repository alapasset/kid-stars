<script setup lang="ts">
import type { FamilyMember } from "~/types/family";

defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()

async function goToDashboard() {
  await navigateTo(`/family`);
}
</script>

<template>
  <h1>{{ t('family.member.hello', { username: member.pseudo, type: t(`family.tutor`).toLocaleLowerCase() }) }}</h1>
  <VBtn @click="goToDashboard">
    {{ t('family.member.return-to-family') }}
  </VBtn>
</template>
