
<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { t } = useI18n()

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {throw createError(error)}
  navigateTo(`/login`)
}

</script>

<template>
  <div>
    <div
      v-if="user"
      class="flex flex-row gap-3"
    >
      <div
        v-if="user.user_metadata.avatar_url"
        class="avatar"
      >
        <div class="w-12 h-12 rounded-full">
          <img :src="user.user_metadata.avatar_url">
        </div>
      </div>
      <div
        v-else
        class="avatar placeholder"
      >
        <div class="bg-neutral text-neutral-content rounded-full w-12">
          <span>SY</span>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle"
        >
          <Icon
            class="w-5 h-5"
            name="material-symbols:menu"
          />
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a @click="navigateTo(`/family`)">{{ t('family.manage') }}</a></li>
          <li><a @click="signOut">{{ t('common.logout') }}</a></li>
        </ul>
      </div>
    </div>
    <NuxtLink
      v-else
      to="/login"
    >
      <CoreButton>
        {{ t('common.login') }}
      </CoreButton>
    </NuxtLink>
  </div>
</template>
