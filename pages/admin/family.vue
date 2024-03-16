<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { data: families, isFetched: isOnFetch } = useFetchFamilies()
const { t } = useI18n()
const myFirstFamily = computed(() => families.value?.[0]?.id)
</script>

<template>
  <MainAdmin
    :is-fetched="isOnFetch"
    :title="t('family.admin.title')"
  >
    <template #form>
      <MemberCreationForm
        v-if="myFirstFamily"
        :family-id="myFirstFamily"
        :title="t('family.admin.title')"
      />
    </template>

    <template #list>
      <MemberList
        v-if="myFirstFamily"
        :family-id="myFirstFamily"
      />
    </template>
  </MainAdmin>
</template>
