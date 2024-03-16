<script setup lang="ts">
import { useFetchFamily } from '~/composables/family'

const props = defineProps<{
  familyId: string
}>()

const { t } = useI18n()

const familyId = toRef(props, 'familyId')

const { data, isFetched, isLoading } = useFetchFamily(familyId)

const childs = computed(() => data.value?.members.filter(member => member.role === 'child'))
const tutors = computed(() => data.value?.members.filter(member => member.role === 'tutor'))
</script>

<template>
  <div>
    <div
      v-if="isFetched"
      class="flex flex-col gap-5"
    >
      <header class="text-center">
        <h1 class="text-3xl">
          {{ t('family.detail.title', {familyName: data?.name}) }}
        </h1>
      </header>
      <div class="flex flex-col justify-center gap-5 text-center">
        <h2 class="text-2xl">{{ t('common.tutor') }}</h2>
        <div class="grid grid-flow-row justify-center gap-5 md:grid-flow-col md:px-5">
          <MemberCard
            v-for="member in tutors"
            :key="member.id"
            :member
          />
        </div>
        <h2 class="text-2xl">{{ t('common.child') }}</h2>
        <div class="grid grid-flow-row justify-center gap-5 md:grid-flow-col md:px-5">
          <MemberCard
            v-for="member in childs"
            :key="member.id"
            :member
          />
        </div>
      </div>
    </div>
    <div v-else-if="isLoading" class="text-center">
      <span class="loading loading-dots loading-lg" />
    </div>
  </div>
</template>
