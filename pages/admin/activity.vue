<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
    'members',
  ],
})

const { data: families, isFetched: isOnFetch } = useFetchFamilies()
const { t } = useI18n()
const myFirstFamily = computed(() => families.value?.[0]?.id)
</script>

<template>
  <MainAdmin
    :is-fetched="isOnFetch"
    :title="t('activity.admin.title')"
    >
    <template #form>
      <ActivityForm
        v-if="myFirstFamily"
        :family-id="myFirstFamily"
      />
    </template>

    <template #list>
      <ActivityList
      v-if="myFirstFamily"
      :family-id="myFirstFamily"
      />
    </template>
</MainAdmin>
</template>
