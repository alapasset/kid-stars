<script setup lang="ts">
definePageMeta({
  middleware: `auth`
})

const supabase = useSupabaseClient()

const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {console.log(error)}

  navigateTo(`/login`)
}
</script>

<template>
  <div>
    <header>
      <VBtn @click="signOut">
        Logout
      </VBtn>
    </header>
    <div class="flex flex-row gap-4 p-2">
      <VBtn @click="navigateTo(`/parent/1`)">
        Parent 1
      </VBtn>
      <VBtn @click="navigateTo(`/parent/2`)">
        Parent 2
      </VBtn>
    </div>
  </div>
</template>
