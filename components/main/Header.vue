<script setup lang="ts">

const supabase = useSupabaseClient()
const user = useSupabaseUser()


async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {console.log(error)}
  navigateTo(`/login`)
}

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: `google`,
    options: {
      redirectTo: `http://localhost:3000/confirm`,
    },
  })
  if (error) {console.log(error)}
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
        Logout
      </VBtn>
      <VBtn
        v-else
        @click="signInWithOAuth"
      >
        Login
      </VBtn>
    </div>
  </header>
</template>
