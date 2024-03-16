<script setup lang="ts">
defineProps<{
  isFetched: boolean
  title: string
}>()

defineSlots<{
  form: () => undefined
  list: () => undefined
}>()
</script>

<template>
  <div class="flex flex-col gap-5">
    <header class="text-center">
      <h1 class="text-2xl">
        {{ title }}
      </h1>
    </header>
    <div class="flex justify-center">
      <slot name="form" />
    </div>
    <div v-if="isFetched">
      <slot name="list" />
    </div>
    <div v-else class="text-center">
      <span class="loading loading-dots loading-lg" />
    </div>
  </div>
</template>
