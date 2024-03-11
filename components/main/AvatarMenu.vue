
<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { t } = useI18n()

const hasAvatar = computed(() => Boolean(user.value?.user_metadata.avatar_url))

async function signOut () {
  const { error } = await supabase.auth.signOut()
  if (error) throw createError(error)
  await navigateTo('/login')
}

async function goToDashboard () {
  await navigateTo('/dashboard')
}
async function goToFamily () {
  await navigateTo('/admin/family')
}
async function goToTask () {
  await navigateTo('/admin/task')

}
</script>

<template>
  <div
    v-if="user"
    class="flex flex-row gap-3"
  >
    <div
      v-if="hasAvatar"
      class="avatar"
    >
      <div class="size-12 rounded-full">
        <img alt="avatar" :src="user.user_metadata.avatar_url">
      </div>
    </div>
    <div
      v-else
      class="avatar placeholder"
    >
      <div class="w-12 rounded-full bg-neutral text-neutral-content">
        <Icon
          class="size-12"
          name="material-symbols:person"
        />
      </div>
    </div>
    <div class="dropdown dropdown-end">
      <div
        class="btn btn-circle btn-ghost"
        role="button"
        tabindex="0"
      >
        <Icon
          class="size-5"
          name="material-symbols:menu"
        />
      </div>
      <ul
        class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box border bg-base-100 p-2 shadow"
        tabindex="0"
      >
        <li><a @click="goToDashboard">{{ t('dashboard.title') }}</a></li>
        <li><a @click="goToFamily">{{ t('family.manage') }}</a></li>
        <li><a @click="goToTask">{{ t('task.manage') }}</a></li>
        <li><a @click="signOut">{{ t('common.logout') }}</a></li>
      </ul>
    </div>
  </div>
  <NuxtLink
    v-else
    to="/login"
  >
    <button class="btn" type="button">
      {{ t('common.login') }}
    </button>
  </NuxtLink>
</template>
