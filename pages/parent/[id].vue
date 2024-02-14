<script setup lang="ts">
definePageMeta({
  middleware: `auth`
})

const route = useRouter().currentRoute.value
const { data: parent } = await useFetch(`/api/parent/${route.params.id}`, {key: `get-one-parent-${route.params.id}`})
</script>

<template>
  <div>
    <VBtn
      rounded
      @click="navigateTo(`/`)"
    >
      Retour
    </VBtn>
    <pre>parent : {{ parent }}</pre>
  </div>
</template>
