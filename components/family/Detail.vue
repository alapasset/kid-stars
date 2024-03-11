<script setup lang="ts">
import { useFetchFamily } from '~/composables/family'

const props = defineProps<{
  familyId: string
}>()

const { t } = useI18n()

const { familyId } = toRefs(props)

const { data, isFetched, isLoading } = useFetchFamily(familyId)

const childs = computed(() => data.value?.members.filter(member => member.code === null))
const tutors = computed(() => data.value?.members.filter(member => member.code))
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
          <FamilyMemberItem
            v-for="member in tutors"
            :key="member.id"
            :member
          />
        </div>
        <h2 class="text-2xl">{{ t('common.child') }}</h2>
        <div class="grid grid-flow-row justify-center gap-5 md:grid-flow-col md:px-5">
          <FamilyMemberItem
            v-for="member in childs"
            :key="member.id"
            :member
          />
        </div>
      </div>
    </div>
    <div
      v-else-if="isLoading"
      class="flex h-96 items-center justify-center"
    >
      <div class="flex w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full" />
        <div class="skeleton h-4 w-28" />
        <div class="skeleton h-4 w-full" />
        <div class="skeleton h-4 w-full" />
      </div>
    </div>
  </div>
</template>
