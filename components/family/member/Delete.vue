<script setup lang="ts">
const props = defineProps<{
  memberId: string
}>()

const { t } = useI18n()

const { mutateAsync, isPending } = useDeleteFamilyMember();
const deleteDialog = ref<HTMLDialogElement>()

const openModal = () => {
  deleteDialog.value?.showModal()
}

const onSubmit = async () => {
  await mutateAsync(props.memberId);
  deleteDialog.value?.close();
}
</script>

<template>
  <div>
    <button
      class="btn btn-ghost btn-circle "
      @click.stop="openModal"
    >
      <Icon
        class="w-10 h-10"
        name="material-symbols:delete"
      />
    </button>
    <dialog
      ref="deleteDialog"
      class="modal"
    >
      <div class="modal-box flex flex-col gap-5">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">
            {{ t('common.deletion') }}
          </h3>
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost">
              <Icon
                class="w-5 h-5"
                name="material-symbols:close"
              />
            </button>
          </form>
        </div>
        <div class="flex flex-col gap-5">
          {{ t('family.member.delete.confirm') }}
        </div>
        <div class="flex flex-col gap-2 p-2">
          <button
            class="btn btn-primary btn-block"
            :disabled="isPending"
            @click="onSubmit"
          >
            <span
              v-if="isPending"
              class="loading loading-spinner"
            />
            {{ t('common.confirm') }}
          </button>
          <button
            class="btn btn-secondary btn-block"
            @click="deleteDialog?.close()"
          >
            {{ t('common.cancel') }}
          </button>
        </div>
      </div>
      <form
        method="dialog"
        class="modal-backdrop"
      >
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
