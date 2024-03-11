<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { data: families, isFetched: isOnFetch } = useFetchFamilies()
const { t } = useI18n()
const myFirstFamily = computed(() => families.value?.[0]?.family)
</script>

<template>
  <MainAdmin
    :is-fetched="isOnFetch"
    :title="t('family.admin.title')"
  >
    <template #form>
      <FamilyMemberCreationForm
        v-if="myFirstFamily"
        :family-id="myFirstFamily"
        :title="t('family.admin.title')"
      />
    </template>

    <template #list>
      <FamilyMemberList
        v-if="myFirstFamily"
        :family-id="myFirstFamily"
      />
    </template>
  </MainAdmin>
</template>
