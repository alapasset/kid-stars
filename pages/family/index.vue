<script setup lang="ts">
import { useFetchFamilies } from '~/composables/family';

definePageMeta({
  middleware: `auth`
})

const { data: families, isFetched } = useFetchFamilies()
const familyId = computed(() => {
  return families.value?.at(0)?.family
})

</script>

<template>
  <div
    v-if="isFetched"
    class="w-full"
  >
    <FamilyDetail
      v-if="familyId"
      :family-id="familyId"
    />
    <FamilyCreationForm
      v-else
      class="m-auto"
    />
  </div>
</template>
