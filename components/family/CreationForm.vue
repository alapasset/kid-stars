<script setup lang="ts">
import type { FamilyCreationForm } from '~/types/family';

const { t } = useI18n()
const { mutate } = useCreateFamily()
const { handleSubmit } = useForm<FamilyCreationForm>();

const { value: name, errorMessage: errorMessageName } = useField<string>(
  `name`,
  inputValue => {
    if(inputValue?.length === 0) return t(`form.error.name.required`);
    return true
  }
);

const { value: pseudo, errorMessage: errorMessagePseudo } = useField<string>(
  `pseudo`,
  inputValue => {
    if(inputValue?.length === 0) return t(`form.error.pseudo.required`);
    return true
  }
);

const { value: code, errorMessage: errorMessageCode } = useField<string>(
`code`,
  inputValue => {
    if(inputValue?.length < 4) return t(`form.error.code.minLegnth`);
    return true
  }
);

const { value: confirmationCode, errorMessage: errorMessageConfirmationCode } = useField<string>(
`confirmationCode`,
  inputValue => {
    if(code.value !== inputValue) return t(`form.error.code.same`);
    return true
  }
);

const onSubmit = handleSubmit(async values => {
  mutate(values)
})
</script>

<template>
  <VCard width="300">
    <template #title>
      <span>{{ t('family.add.title') }}</span>
    </template>
    <template #text>
      <VForm
        class="flex flex-col gap-3"
        @submit.prevent="onSubmit"
      >
        <VTextField
          v-model="name"
          required
          :label="t('form.label.name')"
          type="text"
          :error-messages="errorMessageName"
          prepend-inner-icon="mdi-home-heart"
        />
        <VTextField
          v-model="pseudo"
          required
          :label="t('form.label.pseudo')"
          type="text"
          :error-messages="errorMessagePseudo"
          prepend-inner-icon="mdi-account"
        />
        <VTextField
          v-model="code"
          required
          :label="t('form.label.code')"
          type="number"
          :hint="t('form.hint.code')"
          :error-messages="errorMessageCode"
          prepend-inner-icon="mdi-lock-outline"
        />
        <VTextField
          v-model="confirmationCode"
          required
          :label="t('form.label.validation-code')"
          type="number"
          :error-messages="errorMessageConfirmationCode"
          prepend-inner-icon="mdi-lock-check-outline"
        />
        <div class="flex flex-row-reverse">
          <VBtn
            type="submit"
            color="primary"
            block
          >
            {{ t('common.create') }}
          </VBtn>
        </div>
      </VForm>
    </template>
  </VCard>
</template>
