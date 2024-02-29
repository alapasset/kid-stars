<script setup lang="ts">
import type { FamilyCreationForm } from '~/types/family'

const { t } = useI18n()
const { handleSubmit, setFieldValue } = useForm<FamilyCreationForm>()

const user = useSupabaseUser()

const familyId = computed(() => user?.value?.user_metadata.family)

const { data, isFetched } = useFetchFamily(familyId)
const { mutate: createFamily } = useCreateFamily()
const { mutate: joinFamily } = useJoinFamily(familyId)

const { value: name, errorMessage: errorMessageName } = useField<string>(
  `name`,
  inputValue => {
    if(inputValue?.length === 0) return t(`form.error.name.required`)
    return true
  },
  {
    initialValue: data.value?.name
  }
)

const { value: pseudo, errorMessage: errorMessagePseudo } = useField<string>(
  `pseudo`,
  inputValue => {
    if(inputValue?.length === 0) return t(`form.error.pseudo.required`)
    return true
  }
)

const { value: code, errorMessage: errorMessageCode } = useField<string>(
`code`,
  inputValue => {
    if(inputValue?.length < 4) return t(`form.error.code.minLegnth`)
    return true
  }
)

const { value: confirmationCode, errorMessage: errorMessageConfirmationCode } = useField<string>(
`confirmationCode`,
  inputValue => {
    if(code.value !== inputValue) return t(`form.error.code.same`)
    return true
  }
)

const onSubmit = handleSubmit(async values => {
  isInvitation ? joinFamily(values) : createFamily(values)
})

const isInvitation = computed(() => {
  return !!data.value?.name
})

const pageTitle = computed(() => {
  return isInvitation.value ? t(`family.join.title`) : t(`family.add.title`)
})

const buttonText = computed(() => {
  return isInvitation.value ? t(`common.join`) : t(`common.create`)
})

watch(isFetched, () => {
  setFieldValue(`name`, data.value?.name || ``)
})
</script>

<template>
  <VCard
    v-if="isFetched"
    width="300"
  >
    <template #title>
      <span>{{ pageTitle }}</span>
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
          :disabled="isInvitation"
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
            :text="buttonText"
          />
        </div>
      </VForm>
    </template>
  </VCard>
</template>
