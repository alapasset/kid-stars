<script setup lang="ts">
import type { ChildCreationForm } from '~/types/family';

const emit = defineEmits([`closeModal`])

const { mutateAsync, isSuccess, isPending } = useCreateChild()
const { handleSubmit } = useForm<ChildCreationForm>();

const { value: pseudo, errorMessage: errorMessagePseudo } = useField<string>(
  `pseudo`,
  inputValue => {
    if(inputValue?.length === 0) return `Le pseudo est obligatoire`;
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
      label="Pseudo"
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
      Ajouter
    </VBtn>
  </VForm>
</template>
