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
  <form
    class="flex flex-col gap-3"
    @submit.prevent="onSubmit"
  >
    <CoreInputText
      v-model="pseudo"
      required
      :label="t('form.label.pseudo')"
      :placeholder="t('form.label.pseudo')"
      type="text"
      :error-messages="errorMessagePseudo"
      icon="material-symbols:person"
    />
    <div class="flex flex-col gap-2 p-2">
      <CoreButton
        type="submit"
        :color="`primary`"
        :shape="`block`"
        :text="t('common.add')"
        :is-pending="isPending"
        @click="onSubmit"
      />
      <CoreButton
        :color="`secondary`"
        :shape="`block`"
        :text="t('common.cancel')"
        @click="emit(`closeModal`)"
      />
    </div>
  </form>
</template>
