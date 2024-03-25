
<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { t } = useI18n()

const { data: tutor, isFetched } = useFetchTutorByUser()

async function signOut () {
  const { error } = await supabase.auth.signOut()
  if (error) throw createError(error)
  await navigateTo('/login')
}

const avatar = computed(() => tutor.value?.avatar)

async function goToDashboard () {
  await navigateTo('/dashboard')
}
async function goToAdmin () {
  await navigateTo('/admin/me')
}
</script>

<template>
  <div
    v-if="user"
    class="flex flex-row gap-3"
  >
    <div class="dropdown dropdown-end">
      <div
        class="btn btn-circle btn-ghost"
        role="button"
        tabindex="0"
      >
      <div
        v-if="avatar && isFetched"
        class="avatar"
      >
        <div class="size-12 rounded-full border border-gray-700 pt-2">
          <img alt="avatar" :src="avatar">
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
    </div>
      <ul
        class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box border bg-base-100 p-2 shadow"
        tabindex="0"
      >
        <li><a @click="goToDashboard">{{ t('dashboard.title') }}</a></li>
        <li><a @click="goToAdmin">{{ t('common.administration') }}</a></li>
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
