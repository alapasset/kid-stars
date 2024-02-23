<script setup lang="ts">
import type { FamilyMember } from '~/types/family';

const props = defineProps<{
  member: FamilyMember
}>()

const title = computed(() => props.member.user ? `Tuteur` : `Enfant`)
</script>

<template>
  <VCard width="200">
    <VAvatar
      rounded="0"
      size="200"
      color="grey"
      :text="props.member.pseudo.slice(0,2).toUpperCase()"
    />

    <div class="flex justify-between items-center px-2">
      <VCardTitle>{{ props.member.pseudo }}</VCardTitle>
      <VChip>{{ title }}</VChip>
    </div>
  </VCard>
</template>
