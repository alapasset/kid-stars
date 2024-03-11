<script setup lang="ts">
const { data: families, isFetched } = useFetchFamilies()
const { t } = useI18n()
</script>

<template>
  <div>
    <div
      v-if="isFetched"
      class="flex flex-col gap-5"
    >
      <header class="text-center">
        <h1 class="text-2xl">
          {{ t('task.admin.title') }}
        </h1>
      </header>
      <div class="flex justify-center">
        <TaskCreationForm
          v-if="families?.[0]?.family"
          :family-id="families?.[0]?.family"
        />
      </div>
      <TaskList
        v-if="families?.[0]?.family"
        :family-id="families?.[0]?.family"
      />
    </div>
  </div>
</template>
