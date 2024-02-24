<script setup lang="ts">
const showModal = ref(false)
const currentTab = ref(0)
const tabs = [`Enfant`, `Tuteur`]

function onCloseModal() {
  console.log(`onCloseModal`)
  showModal.value = false
}
</script>

<template>
  <VCard
    width="200"
    hover
    @click="showModal = true"
  >
    <div
      class="bg-gray-200 h-52 flex justify-center items-center"
    >
      <VIcon
        size="100"
        icon="mdi-plus-circle-outline"
      />
    </div>
    <div class="text-center">
      <VCardTitle>Nouveau membre</VCardTitle>
    </div>
  </VCard>
  <VDialog
    v-model="showModal"
    width="500"
  >
    <VCard>
      <VCardTitle class="text-center border-2 border-gray-100">
        Ajouter un membre
      </VCardTitle>
      <VTabs
        v-model="currentTab"
        align-tabs="center"
      >
        <VTab
          v-for="(tab, index) in tabs"
          :key="index"
        >
          {{ tab }}
        </VTab>
      </VTabs>

      <VCardText>
        <VWindow v-model="currentTab">
          <VWindowItem value="one">
            <FamilyMemberChildForm @close-modal="onCloseModal" />
          </VWindowItem>

          <VWindowItem value="two">
            TODO
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
