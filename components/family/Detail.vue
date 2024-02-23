<script setup lang="ts">
import type { FamilyMember } from '~/types/family';

const props = defineProps<{
  familyId: string
}>()

const { data, isFetched } = useFetchFamily(props.familyId)
</script>

<template>
  <div
    v-if="isFetched"
    class="flex flex-col gap-5"
  >
    <header class="text-center">
      <h1 class="text-2xl">
        {{ `Les membres de la famille ${data?.name}` }}
      </h1>
    </header>
    <div class="grid gap-5 px-5 justify-center">
      <FamilyMember
        v-for="member in data?.family_member"
        :key="member.id"
        :member="member"
      />
    </div>
  </div>
</template>
