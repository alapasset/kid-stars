<script setup lang="ts">
import type { FamilyMember } from "~/types/family";

defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()
</script>

<template>
  <h1>{{ t('family.member.hello', { username: member.pseudo, type: t(`family.child`).toLocaleLowerCase() }) }}</h1>
  <NuxtLink to="/family">
    <button class="btn">
      {{ t('family.member.return-to-family') }}
    </button>
  </NuxtLink>
</template>
