
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCurrentFamilyMemberStore } from '~/storage/user'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { t } = useI18n()

const currentFamilyMemberStore = useCurrentFamilyMemberStore()
const { currentFamilyMember, isLogged } = storeToRefs(currentFamilyMemberStore)

const isTutor = computed(() => currentFamilyMember.value && currentFamilyMember.value.role === 'tutor')

async function signOut () {
  const { error } = await supabase.auth.signOut()
  if (error) throw createError(error)
  await navigateTo('/login')
}

async function goToDashboard () {
  await navigateTo('/dashboard')
}
async function goToAdmin () {
  await navigateTo('/admin/me')
}

async function goToFamilyMemberSelection () {
  currentFamilyMemberStore.clearFamilyMember()
  await navigateTo('/current-family-member')
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
        v-if="currentFamilyMember?.avatar"
        class="avatar"
      >
        <div class="size-12 rounded-full border border-gray-700 pt-2">
          <img alt="avatar" :src="currentFamilyMember.avatar">
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
        <li v-if="isLogged"><a @click="goToFamilyMemberSelection">{{ t('common.change-user')}}</a></li>
        <li v-if="isLogged"><a @click="goToDashboard">{{ t('dashboard.title') }}</a></li>
        <li v-if="isLogged && isTutor"><a @click="goToAdmin">{{ t('common.administration') }}</a></li>
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
