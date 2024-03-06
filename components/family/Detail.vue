<script setup lang="ts">
import { useFetchFamily } from '~/composables/family';

const props = defineProps<{
  familyId: string
}>()

const { t } = useI18n()

const { data, isFetched, isLoading } = useFetchFamily(props.familyId)
</script>

<template>
  <div>
    <div
      v-if="isFetched"
      class="flex flex-col gap-5"
    >
      <header class="text-center">
        <h1 class="text-2xl">
          {{ t('family.detail.title', {familyName: data?.name}) }}
        </h1>
      </header>
      <div class="grid grid-flow-row md:grid-flow-col gap-5 md:px-5 justify-center">
        <FamilyMemberItem
          v-for="member in data?.family_member"
          :key="member.id"
          :member="member"
        />
        <FamilyMemberAdd />
      </div>
    </div>
    <div
      v-else-if="isLoading"
      class="flex justify-center items-center h-96"
    >
      <div class="flex flex-col gap-4 w-52">
        <div class="skeleton h-32 w-full" />
        <div class="skeleton h-4 w-28" />
        <div class="skeleton h-4 w-full" />
        <div class="skeleton h-4 w-full" />
      </div>
    </div>
  </div>
</template>
