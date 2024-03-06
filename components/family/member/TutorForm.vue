<script setup lang="ts">
import type { TutorCreationForm } from '~/types/family';

const emit = defineEmits([`closeModal`])

const { mutateAsync, isSuccess, isPending } = useInviteTutor()
const { handleSubmit } = useForm<TutorCreationForm>();

const { t } = useI18n()

const { value: email, errorMessage: errorMessageEmail } = useField<string>(
  `invitedEmail`,
  inputValue => {
    const emailValidationRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
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
  <form
    class="flex flex-col gap-3"
    @submit.prevent="onSubmit"
  >
    <CoreInputText
      v-model="email"
      required
      :label="t('form.label.email')"
      :placeholder="t('form.label.email')"
      type="email"
      :error-messages="errorMessageEmail"
      icon="material-symbols:alternate-email"
    />

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
        {{ t('common.invite') }}
      </button>
      <button
        class="btn btn-secondary btn-block"
        @click="emit(`closeModal`)"
      >
        {{ t('common.cancel') }}
      </button>
    </div>
  </form>
</template>
