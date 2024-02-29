<script setup lang="ts">
import type { TutorCreationForm } from '~/types/family';

const emit = defineEmits([`closeModal`])

const { mutateAsync, isSuccess, isPending } = useInviteTutor()
const { handleSubmit } = useForm<TutorCreationForm>();

const { t } = useI18n()

const { value: email, errorMessage: errorMessageEmail } = useField<string>(
  `invitedEmail`,
  inputValue => {
    const emailValidationRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (inputValue?.length === 0) return t(`form.error.email.required`);
    if (!emailValidationRegExp.test(inputValue)) return t(`form.error.email.invalid`);
    return true
  }
);

const onSubmit = handleSubmit(async values => {
  await mutateAsync(values)
  if (isSuccess) emit(`closeModal`)
})
</script>

<template>
  <VForm
    class="flex flex-col gap-3"
    @submit.prevent="onSubmit"
  >
    <VTextField
      v-model="email"
      required
      :label="t('form.label.email')"
      type="email"
      :error-messages="errorMessageEmail"
      prepend-inner-icon="mdi-email"
    />
    <VBtn
      :loading="isPending"
      :disabled="isPending"
      type="submit"
      color="primary"
      block
    >
      {{ t('common.invite') }}
    </VBtn>
  </VForm>
</template>
