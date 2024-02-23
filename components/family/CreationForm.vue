<script setup lang="ts">
import type { FamilyCreationForm } from '~/types/family';

const { mutate } = useCreateFamily()
const { handleSubmit } = useForm<FamilyCreationForm>();

const { value: name, errorMessage: errorMessageName } = useField<string>(
  `name`,
  inputValue => {
    if(inputValue?.length === 0) return `Le nom de la famille est obligatoire`;
    return true
  }
);

const { value: pseudo, errorMessage: errorMessagePseudo } = useField<string>(
  `pseudo`,
  inputValue => {
    if(inputValue?.length === 0) return `Le pseudo est obligatoire`;
    return true
  }
);

const { value: code, errorMessage: errorMessageCode } = useField<string>(
`code`,
  inputValue => {
    if(inputValue?.length < 4) return `Le code de la session doit faire 4 caractères minimum`;
    return true
  }
);

const { value: confirmationCode, errorMessage: errorMessageConfirmationCode } = useField<string>(
`confirmationCode`,
  inputValue => {
    if(code.value !== inputValue) return `Le code doit être identique`;
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
      <span>Création de votre famille</span>
    </template>
    <template #text>
      <VForm
        class="flex flex-col gap-3"
        @submit.prevent="onSubmit"
      >
        <VTextField
          v-model="name"
          label="Nom de la famille"
          type="text"
          :error-messages="errorMessageName"
          prepend-inner-icon="mdi-home-heart"
        />
        <VTextField
          v-model="pseudo"
          label="Mon pseudo"
          type="text"
          :error-messages="errorMessagePseudo"
          prepend-inner-icon="mdi-account"
        />
        <VTextField
          v-model="code"
          label="Code de la session parent"
          type="number"
          hint="code numerique (ex: 123456789)"
          :error-messages="errorMessageCode"
          prepend-inner-icon="mdi-lock-outline"
        />
        <VTextField
          v-model="confirmationCode"
          label="Valider le code"
          type="number"
          :error-messages="errorMessageConfirmationCode"
          prepend-inner-icon="mdi-lock-check-outline"
        />
        <div class="flex flex-row-reverse">
          <VBtn type="submit">
            Créer
          </VBtn>
        </div>
      </VForm>
    </template>
  </VCard>
</template>
