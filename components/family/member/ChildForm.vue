<script setup lang="ts">
import type { ChildCreationForm } from '~/types/family';

const emit = defineEmits([`closeModal`])

const { mutateAsync, isSuccess, isPending } = useCreateChild()
const { handleSubmit } = useForm<ChildCreationForm>();

const { t } = useI18n()

const { value: pseudo, errorMessage: errorMessagePseudo } = useField<string>(
  `pseudo`,
  inputValue => {
    if (inputValue?.length === 0) return t(`form.error.pseudo.required`);
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
      v-model="pseudo"
      required
      :label="t('form.label.pseudo')"
      type="text"
      :error-messages="errorMessagePseudo"
      prepend-inner-icon="mdi-account"
    />
    <VBtn
      :loading="isPending"
      :disabled="isPending"
      type="submit"
      color="primary"
      block
    >
      {{ t('common.add') }}
    </VBtn>
  </VForm>
</template>
