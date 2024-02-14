<script setup lang="ts">
const supabase = useSupabaseClient()

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
  <VBtn @click="signInWithOAuth">
    Login
  </VBtn>
</template>
