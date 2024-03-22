<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const { isPending, isSuccess, mutate } = useTutorCheckCode()
const route = useRoute()
const currentPage = computed(() => route.path.split('/').pop())
const pages = ['me', 'family', 'task', 'activity', 'history']
const showAdmin = ref(false)

function onComplete (value: string) {
  mutate(value)
}

watch(isSuccess, async (isNewSuccess: boolean) => {
  if(isNewSuccess) {
    showAdmin.value = true
    await navigateTo('/admin/me')
  }
})
</script>

<template>
  <div>
    <div v-if="!showAdmin" class="flex flex-col items-center gap-5">
      <h2 class="text-xl">{{ t('admin.code.title') }}</h2>
      <div v-if="isPending" class="text-center">
        <span class="loading loading-dots loading-lg" />
      </div>
      <CoreInputOneTapPassword v-else @on-complete="onComplete" />
    </div>
    <div v-else class="flex flex-col gap-5">
      <div class="tabs-boxed tabs mx-auto max-w-xl" role="tablist">
        <NuxtLink v-for="page in pages" :key="page" class="tab" :class="{'tab-active': currentPage === page}" role="tab" :to="`/admin/${page}`">
          {{ t(`common.${page}`) }}
        </NuxtLink>
      </div>
      <NuxtPage />
    </div>
  </div>
</template>
