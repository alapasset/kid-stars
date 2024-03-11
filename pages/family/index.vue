<script setup lang="ts">
import { useFetchFamilies } from '~/composables/family'

definePageMeta({
  middleware: 'auth',
})

const { data: families, isFetched } = useFetchFamilies()

</script>

<template>
  <div v-if="isFetched" class="w-full">
    <FamilyDetail
      v-if="families?.[0]?.family"
      :family-id="families?.[0]?.family"
    />
    <FamilyCreationForm
      v-else
      class="m-auto"
    />
  </div>
  <div v-else class="flex h-96 items-center justify-center">
    <div class="flex w-52 flex-col gap-4">
      <div class="skeleton h-32 w-full" />
      <div class="skeleton h-4 w-28" />
      <div class="skeleton h-4 w-full" />
      <div class="skeleton h-4 w-full" />
    </div>
  </div>
</template>
