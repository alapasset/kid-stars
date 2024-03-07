<script setup lang="ts">
import { BUTTON_COLOR, BUTTON_SHAPE, BUTTON_STATE, BUTTON_TYPE } from '~/types/button';

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
    <CoreButton
      :type="BUTTON_TYPE.button"
      :state="BUTTON_STATE.ghost"
      :shape="BUTTON_SHAPE.circle"
      @click.stop="openModal"
    >
      <Icon
        class="w-10 h-10"
        name="material-symbols:delete"
      />
    </CoreButton>
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
            <CoreButton
              class="absolute right-2 top-2"
              :type="BUTTON_TYPE.button"
              :state="BUTTON_STATE.ghost"
              :shape="BUTTON_SHAPE.circle"
              @click="deleteDialog?.close()"
            >
              <Icon
                class="w-5 h-5"
                name="material-symbols:close"
              />
            </CoreButton>
          </form>
        </div>
        <div class="flex flex-col gap-5">
          {{ t('family.member.delete.confirm') }}
        </div>
        <div class="flex flex-col gap-2 p-2">
          <CoreButton
            :type="BUTTON_TYPE.submit"
            :color="BUTTON_COLOR.primary"
            :shape="BUTTON_SHAPE.block"
            :is-pending="isPending"
            @click="onSubmit"
          >
            {{ t('common.confirm') }}
          </CoreButton>
          <CoreButton
            :color="BUTTON_COLOR.secondary"
            :shape="BUTTON_SHAPE.block"
            @click="deleteDialog?.close()"
          >
            {{ t('common.cancel') }}
          </CoreButton>
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
