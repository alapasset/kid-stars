<script setup lang="ts">
import type { Child, ChildForm } from '~/types/member'

const props = defineProps<{
  child: Child
}>()

const child = toRef(props, 'child')

const { t } = useI18n()
const { isPending, isSuccess, mutateAsync } = useUpdateChild(child.value.id)
const editDialog = ref<HTMLDialogElement>()

const { handleSubmit, values } = useForm<ChildForm>({
  initialValues: {
    ...child.value,
  },
})

const { errorMessage: errorMessagePseudo, value: pseudo } = useField<string>(
  'pseudo',
  inputValue => {
    if(!inputValue || inputValue.length === 0) return t('form.error.pseudo.required')
    return true
  },
)

function openModal () {
  editDialog.value?.showModal()
}

function closeModal () {
  editDialog.value?.close()
}

const onSubmit = handleSubmit(async () => {
  await mutateAsync(values)
  if(isSuccess.value) editDialog.value?.close()
})
</script>

<template>
  <div>
    <button
      class="btn btn-circle btn-ghost "
      type="button"
      @click.stop="openModal"
    >
      <Icon
        class="size-7 md:size-9"
        name="material-symbols:box-edit-outline"
      />
    </button>
    <dialog
      ref="editDialog"
      class="modal"
    >
      <div class="modal-box flex flex-col gap-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold">
            {{ t('family.member.edit.title') }}
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
          <CoreInputText
            v-model="pseudo"
            :error-messages="errorMessagePseudo"
            icon="material-symbols:person"
            :label="t('form.label.pseudo')"
            :placeholder="t('form.label.pseudo')"
            required
          />
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
        <button type="submit">close</button>
      </form>
    </dialog>
  </div>
</template>
