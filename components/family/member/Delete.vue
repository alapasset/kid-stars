<script setup lang="ts">
const props = defineProps<{
  memberId: string
}>()
const openDialog = ref(false);
const { mutation: deleteFamilyMember } = useDeleteFamilyMember();

const onDelete = () => {
  openDialog.value = true;
}
const confirmDeletion = () => {
  deleteFamilyMember.mutate(props.memberId);
  openDialog.value = false;
}
</script>

<template>
  <div>
    <VBtn
      icon
      @click.stop="onDelete"
    >
      <VIcon size="20" class="text-red-600">mdi-delete</VIcon>
    </VBtn>
    <VDialog
      v-model="openDialog"
      max-width="400"
    >
      <VCard>
        <VCardTitle>
          Confirmer la suppression
        </VCardTitle>
        <VCardText>
          Êtes-vous sûr de vouloir supprimer le membre de la famille?
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="blue darken-1"  @click="openDialog = false">
            Annuler
          </VBtn>
          <VBtn color="blue darken-1"  @click="confirmDeletion()">
            Confirmer
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
