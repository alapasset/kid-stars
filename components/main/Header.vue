
<script setup lang="ts">
const { t } = useI18n()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const runtimeConfig = useRuntimeConfig()
const redirectTo = `${runtimeConfig.public.DEPLOY_PRIME_URL}/confirm`

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {throw createError(error)}
  navigateTo(`/login`)
}

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: `google`,
    options: {
      redirectTo,
    },
  })
  if (error) {throw createError(error)}
}

</script>

<template>
  <header class="w-full flex justify-between border-b-2 border-gray-100 h-24 p-3 items-center">
    <img
      src="/logo.png"
      alt="Logo"
      class="h-20"
    >
    <div>
      <VBtn
        v-if="user"
        @click="signOut"
      >
        {{ t('common.logout') }}
      </VBtn>
      <VBtn
        v-else
        @click="signInWithOAuth"
      >
        {{ t('common.login') }}
      </VBtn>
    </div>
  </header>
</template>
