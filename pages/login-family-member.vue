<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const { isSuccess, mutateAsync } = useTutorCheckCode()
const { connectFamilyMember } = useCurrentFamilyMemberStore()
const isPending = ref(false)
async function onComplete (value: string) {
  isPending.value = true
  try {
    await mutateAsync(value)
  } catch {
    isPending.value = false
  }

  if(isSuccess.value) {
    connectFamilyMember()
    await navigateTo('/dashboard')
  }
}

</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <h2 class="text-xl">{{ t('admin.code.title') }}</h2>
    <div v-if="isPending" class="text-center">
      <span class="loading loading-dots loading-lg" />
    </div>
    <CoreInputOneTapPassword v-else @on-complete="onComplete" />
  </div>
</template>

