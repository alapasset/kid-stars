<script setup lang="ts">
import { useFetchFamilyMembersByUser } from '~/composables/member'
import type { FamilyMember } from '~/types/member'

definePageMeta({
  middleware: 'auth',
})

const { data, isFetched, isLoading } = useFetchFamilyMembersByUser()
const { t } = useI18n()

const childs = computed(() => data.value?.filter(member => member.role === 'child'))
const tutors = computed(() => data.value?.filter(member => member.role === 'tutor'))
const { setFamilyMember } = useCurrentFamilyMemberStore()



async function goToProfile (member: FamilyMember) {
  setFamilyMember(member)
  await navigateTo('/dashboard')
}
</script>

<template>
  <div
    v-if="isFetched"
    class="flex flex-col gap-5"
  >
    <header class="text-center">
      <h1 class="text-3xl">
        {{ t('common.select-user')}}
      </h1>
    </header>
    <div class="flex flex-col justify-center gap-5 text-center">
      <h2 class="text-2xl">{{ t('common.tutor') }}</h2>
      <div class="grid grid-flow-row justify-center gap-5 md:grid-flow-col md:px-5">
        <MemberCard
          v-for="member in tutors"
          :key="member.id"
          class="cursor-pointer"
          :is-light="false"
          :member
          @click="() => goToProfile(member)"
        />
      </div>
      <h2 class="text-2xl">{{ t('common.child') }}</h2>
      <div class="grid grid-flow-row justify-center gap-5 md:grid-flow-col md:px-5">
        <MemberCard
          v-for="member in childs"
          :key="member.id"
          class="cursor-pointer"
          :is-light="false"
          :member
          @click="() => goToProfile(member)"
        />
      </div>
    </div>
  </div>
  <div v-else-if="isLoading" class="text-center">
    <span class="loading loading-dots loading-lg" />
  </div>
</template>

