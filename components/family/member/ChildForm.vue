<script setup lang="ts">
import { BUTTON_COLOR, BUTTON_SHAPE, BUTTON_TYPE } from '~/types/button';
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
        :type="BUTTON_TYPE.submit"
        :color="BUTTON_COLOR.primary"
        :shape="BUTTON_SHAPE.block"
        :is-pending="isPending"
      >
        {{ t('common.add') }}
      </CoreButton>
      <CoreButton
        :color="BUTTON_COLOR.secondary"
        :shape="BUTTON_SHAPE.block"
        @click="emit(`closeModal`)"
      >
        {{ t('common.cancel') }}
      </CoreButton>
    </div>
  </form>
</template>
