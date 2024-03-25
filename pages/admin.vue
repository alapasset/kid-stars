<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const { isPending, isSuccess, mutate } = useTutorCheckCode()
const route = useRoute()
const currentPage = computed(() => route.path.split('/').pop())
const pages = ['me', 'family', 'task', 'activity', 'avatar', 'history']
const showAdmin = ref(false)
const menuDialog = ref<HTMLInputElement>()

function onComplete (value: string) {
  mutate(value)
}

async function navigateMenu (path: string) {
  await navigateTo(path)
  menuDialog.value?.click()
}

watch(isSuccess, async (isNewSuccess: boolean) => {
  if(isNewSuccess) {
    showAdmin.value = true
    await navigateTo('/admin/me')
  }
})
</script>

<template>
  <div v-if="!showAdmin" class="flex flex-col items-center gap-5">
    <h2 class="text-xl">{{ t('admin.code.title') }}</h2>
    <div v-if="isPending" class="text-center">
      <span class="loading loading-dots loading-lg" />
    </div>
    <CoreInputOneTapPassword v-else @on-complete="onComplete" />
  </div>
  <div v-else class="drawer">
    <input id="drawer-menu" ref="menuDialog" class="drawer-toggle" type="checkbox" />
    <div class="drawer-content flex flex-col">
      <div class="navbar mb-3 w-full rounded bg-base-300">
        <!-- Mobil Navbar -->
        <div class="flex-none lg:hidden">
          <label aria-label="open sidebar" class="btn btn-square btn-ghost" for="drawer-menu">
            <Icon
              class="size-5"
              name="material-symbols:menu"
            />
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">{{ t('common.administration') }}</div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
            <li v-for="page in pages" :key="page">
              <NuxtLink :class="{'active': currentPage === page}" :to="`/admin/${page}`">
                {{ t(`common.${page}`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <!-- Content -->
      <NuxtPage />
    </div>
    <!-- Desktop Menu -->
    <div class="drawer-side">
      <label aria-label="close sidebar" class="drawer-overlay" for="drawer-menu"></label>
      <ul class="menu min-h-full w-80 bg-base-200 p-4">
        <li v-for="page in pages" :key="page">
          <NuxtLink :class="{'active': currentPage === page}" @click="() => navigateMenu(`/admin/${page}`)">
            {{ t(`common.${page}`) }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
