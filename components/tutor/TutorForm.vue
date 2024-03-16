<script setup lang="ts">
import type { FamilyInvitationForm } from '~/types/family'

const props = defineProps<{
  familyId: string
}>()

const familyId = toRef(props, 'familyId')

const { isPending, mutateAsync } = useFamilyInvitation(familyId)
const { handleSubmit } = useForm<FamilyInvitationForm>()

const { t } = useI18n()

const { errorMessage: errorMessageEmail, value: email } = useField<string>(
  'invitedEmail',
  inputValue => {
    const emailValidationRegExp = /^[\w.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,4}$/u
    if (inputValue && inputValue.length === 0) return t('form.error.email.required')
    if (!emailValidationRegExp.test(inputValue)) return t('form.error.email.invalid')
    return true
  },
)

const onSubmit = handleSubmit(async values => {
  await mutateAsync(values)
})
</script>

<template>
  <form
    class="flex flex-col gap-3"
    @submit.prevent="onSubmit"
  >
    <CoreInputText
      v-model="email"
      :error-messages="errorMessageEmail"
      icon="material-symbols:alternate-email"
      :label="t('form.label.email')"
      :placeholder="t('form.label.email')"
      required
      type="email"
    />

    <div class="flex flex-col gap-2 p-2">
      <button
        class="btn btn-primary btn-block"
        :disabled="isPending"
        type="submit"
      >
        <span
          v-if="isPending"
          class="loading loading-spinner"
        />
        {{ t('common.invite') }}
      </button>
    </div>
  </form>
</template>
