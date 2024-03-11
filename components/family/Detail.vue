<script setup lang="ts">
import { useFetchFamily } from '~/composables/family'

const props = defineProps<{
  familyId: string
}>()

const { t } = useI18n()

const { familyId } = toRefs(props)

const { data, isFetched, isLoading } = useFetchFamily(familyId)
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
      <div class="grid grid-flow-row justify-center gap-5 md:grid-flow-col md:px-5">
        <FamilyMemberItem
          v-for="member in data?.members"
          :key="member.id"
          :member
        />
        <FamilyMemberAdd />
      </div>
    </div>
    <div
      v-else-if="isLoading"
      class="flex h-96 items-center justify-center"
    >
      <div class="flex w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full" />
        <div class="skeleton h-4 w-28" />
        <div class="skeleton h-4 w-full" />
        <div class="skeleton h-4 w-full" />
      </div>
    </div>
  </div>
</template>
