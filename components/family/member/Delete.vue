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
        <div class="flex flex-col gap-2 p-2">
          <VBtn
            color="primary"
            block
            @click="confirmDeletion()"
          >
            {{ t('common.confirm') }}
          </VBtn>
          <VBtn
            block
            color="secondary"
            @click="openDialog = false"
          >
            {{ t('common.cancel') }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>
