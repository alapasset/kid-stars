<script setup lang="ts">
import { BUTTON_COLOR, BUTTON_SHAPE, BUTTON_TYPE } from '~/types/button';
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

const showModal = computed(() => {
  return isFetched.value || !isInvitation.value
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
  <div
    v-if="showModal"
    class="card w-96 bg-base-100 shadow-xl"
  >
    <div class="card-body">
      <h2 class="card-title">
        {{ pageTitle }}
      </h2>

      <form
        novalidate
        class="flex flex-col gap-3"
        @submit.prevent="onSubmit"
      >
        <CoreInputText
          v-model="name"
          required
          :label="t('form.label.name')"
          :placeholder="t('form.label.name')"
          :disabled="isInvitation"
          :error-messages="errorMessageName"
          icon="material-symbols:home"
        />
        <CoreInputText
          v-model="pseudo"
          required
          :label="t('form.label.pseudo')"
          :placeholder="t('form.label.pseudo')"
          :error-messages="errorMessagePseudo"
          icon="material-symbols:person"
        />
        <CoreInputText
          v-model="code"
          type="number"
          required
          :label="t('form.label.code')"
          :placeholder="t('form.label.code')"
          :hint="t('form.hint.code')"
          :error-messages="errorMessageCode"
          icon="material-symbols:lock"
        />
        <CoreInputText
          v-model="confirmationCode"
          type="number"
          required
          :label="t('form.label.validation-code')"
          :placeholder="t('form.label.validation-code')"
          :error-messages="errorMessageConfirmationCode"
          icon="material-symbols:shield-lock"
        />
        <div class="flex flex-row-reverse">
          <CoreButton
            :type="BUTTON_TYPE.submit"
            :color="BUTTON_COLOR.primary"
            :shape="BUTTON_SHAPE.block"
          >
            {{ buttonText }}
          </CoreButton>
        </div>
      </form>
    </div>
  </div>
</template>
