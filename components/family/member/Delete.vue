<script setup lang="ts">
const props = defineProps<{
  memberId: string
}>()

const { t } = useI18n()

const openDialog = ref(false);
const { mutateAsync } = useDeleteFamilyMember();

const onDelete = () => {
  openDialog.value = true;
}
const confirmDeletion = async () => {
  await mutateAsync(props.memberId);
  openDialog.value = false;
}
</script>

<template>
  <div>
    <VBtn
      icon="mdi-delete"
      color="error"
      @click.stop="onDelete"
    />
    <VDialog
      v-model="openDialog"
      max-width="400"
    >
      <VCard>
        <VCardTitle>
          {{ t('common.deletion') }}
        </VCardTitle>
        <VCardText>
          {{ t('family.member.delete.confirm') }}
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="secondary"
            @click="openDialog = false"
          >
            {{ t('common.cancel') }}
          </VBtn>
          <VBtn
            color="primary"
            @click="confirmDeletion()"
          >
            {{ t('common.confirm') }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
