<script setup lang="ts">
definePageMeta({
  middleware: [
    'auth',
    'members',
  ],
})

const { t } = useI18n()
const route = useRoute()
const currentPage = computed(() => route.path.split('/').pop())
const pages = ['me', 'family', 'task', 'activity', 'avatar', 'history']
const menuDialog = ref<HTMLInputElement>()

async function navigateMenu (path: string) {
  await navigateTo(path)
  menuDialog.value?.click()
}
</script>

<template>
  <div class="drawer">
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
