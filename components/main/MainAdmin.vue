<script setup lang="ts">
defineProps<{
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
    <div>
      <slot name="list" />
    </div>
  </div>
</template>
