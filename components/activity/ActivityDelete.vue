<script setup lang="ts">
import type { Activity } from '~/types/activity'

const props = defineProps<{
  activity: Activity
}>()

const activity = toRef(props, 'activity')

const { t } = useI18n()

const { isPending, mutateAsync } = useDeleteActivity(activity.value.id)

const deleteDialog = ref<HTMLDialogElement>()

function openModal () {
  deleteDialog.value?.showModal()
}

function closeModal () {
  deleteDialog.value?.close()
}

async function onSubmit () {
  await mutateAsync()
  deleteDialog.value?.close()
}
</script>

<template>
<div>
    <button
      class="btn btn-circle btn-ghost "
      type="button"
      @click.stop="openModal"
    >
      <Icon
        class="size-7 hover:cursor-pointer md:size-9"
        name="material-symbols:delete"
     />
    </button>
    <dialog
      ref="deleteDialog"
      class="modal"
    >
      <div class="modal-box flex flex-col gap-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold">
            {{ t('common.deletion') }}
          </h3>
          <form method="dialog">
            <button class="btn btn-circle btn-ghost btn-sm" type="submit">
              <Icon
                class="size-5"
                name="material-symbols:close"
              />
            </button>
          </form>
        </div>
        <div class="flex flex-col gap-5">
          {{ t('activity.admin.form.delete.confirm') }}
        </div>
        <div class="flex flex-col gap-2 p-2">
          <button
            class="btn btn-primary btn-block"
            :disabled="isPending"
            type="button"
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
            type="button"
            @click="closeModal"
          >
            {{ t('common.cancel') }}
          </button>
        </div>
      </div>
      <form
        class="modal-backdrop"
        method="dialog"
      >
        <button type="submit"></button>
      </form>
    </dialog>
  </div>
</template>
