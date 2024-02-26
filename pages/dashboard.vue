<script setup lang="ts">
definePageMeta({
  middleware: `auth`
})

async function goToFamily() {
  await navigateTo(`/family`)
}
</script>

<template>
  <VBtn @click="goToFamily">
    Gerer ma famille
  </VBtn>
</template>
