<script setup lang="ts">
import type { ChildCreationForm } from '~/types/family'

const emit = defineEmits<{
  closeModal: []
}>()

const { mutateAsync, isSuccess, isPending } = useCreateChild()
const { handleSubmit } = useForm<ChildCreationForm>()

const { t } = useI18n()

const { value: pseudo, errorMessage: errorMessagePseudo } = useField<string>(
  'pseudo',
  inputValue => {
    if (!inputValue || inputValue.length === 0) return t('form.error.pseudo.required')
    return true
  },
)

const onSubmit = handleSubmit(async values => {
  await mutateAsync(values)
  if (isSuccess.value) emit('closeModal')
})

function closeModal () {
  emit('closeModal')
}
</script>

<template>
  <form
    class="flex flex-col gap-3"
    @submit.prevent="onSubmit"
  >
    <CoreInputText
      v-model="pseudo"
      :error-messages="errorMessagePseudo"
      icon="material-symbols:person"
      :label="t('form.label.pseudo')"
      :placeholder="t('form.label.pseudo')"
      required
      type="text"
    />
    <div class="flex flex-col gap-2 p-2">
      <button
        class="btn btn-primary btn-block"
        :disabled="isPending"
        type="submit"
      >
        <span
          v-if="isPending"
          class="loading loading-spinner"
        />
        {{ t('common.add') }}
      </button>
      <button
        class="btn btn-secondary btn-block"
        type="button"
        @click="closeModal"
      >
        {{ t('common.cancel') }}
      </button>
    </div>
  </form>
</template>
