<script setup lang="ts">
import type { TutorCreationForm } from '~/types/family'

const emit = defineEmits<{
  closeModal: []
}>()

const { mutateAsync, isSuccess, isPending } = useInviteTutor()
const { handleSubmit } = useForm<TutorCreationForm>()

const { t } = useI18n()

const { value: email, errorMessage: errorMessageEmail } = useField<string>(
  'invitedEmail',
  inputValue => {
    const emailValidationRegExp = /^[\w.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,4}$/u
    if (inputValue && inputValue.length === 0) return t('form.error.email.required')
    if (!emailValidationRegExp.test(inputValue)) return t('form.error.email.invalid')
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
      v-model="email"
      :error-messages="errorMessageEmail"
      icon="material-symbols:alternate-email"
      :label="t('form.label.email')"
      :placeholder="t('form.label.email')"
      required
      type="email"
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
        {{ t('common.invite') }}
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
