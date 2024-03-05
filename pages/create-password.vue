<script lang="ts" setup>
import type { UserPasswordCreationForm } from '~/types/user';

const client = useSupabaseClient()
const { accessToken, refreshToken } = useGetTokens()
const { notifyError, notifySuccess } = useNotifications()
const { t } = useI18n()
const supabase = useSupabaseClient()
const isLoading = ref(false)

const { handleSubmit } = useForm<UserPasswordCreationForm>()

const { value: password, errorMessage: errorMessagePassword } = useField<string>(
`password`,
  inputValue => {
    const passwordValidationRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (inputValue?.length === 0) return t(`form.error.password.required`)
    if (!passwordValidationRegExp.test(inputValue)) return t(`form.error.password.invalid`)
    return true
  }
)

const { value: confirmationPassword, errorMessage: errorMessageConfirmationPassword } = useField<string>(
`confirmationPassword`,
  inputValue => {
    if(password.value !== inputValue) return t(`form.error.password.same`)
    return true
  }
)

const onSubmit = handleSubmit(async () => {
  isLoading.value = true

  if (!accessToken || !refreshToken) throw createError(t(`common.error`))

  const { error: sessionError } = await client.auth.setSession({access_token: accessToken, refresh_token: refreshToken})

  if (sessionError) {
    notifyError(t(`notification.create-password.error`))
    isLoading.value = false
    throw createError(sessionError)
  }

  const { error: updateUserError } = await supabase.auth.updateUser({ password: password.value })
  if (updateUserError) {
    notifyError(t(`notification.create-password.error`))
    isLoading.value = false
    throw createError(updateUserError)
  }

  notifySuccess(t(`notification.create-password.success`))
  isLoading.value = false
  navigateTo(`/dashboard`)
})
</script>

<template>
  <VForm
    class="w-1/6 mt-10 mx-auto p-8 flex flex-col gap-4 rounded-lg bg-gray-100 border border-gray-600"
    @submit.prevent="onSubmit"
  >
    <h2 class="mb-5 text-lg font-medium">
      {{ t('create-password.title') }}
    </h2>

    <VTextField
      v-model="password"
      required
      :label="t('form.label.password')"
      type="password"
      :error-messages="errorMessagePassword"
      :hint="t('form.hint.password')"
      prepend-inner-icon="mdi-lock"
    />
    <VTextField
      v-model="confirmationPassword"
      required
      :label="t('form.label.confirmation-password')"
      type="password"
      :error-messages="errorMessageConfirmationPassword"
      prepend-inner-icon="mdi-lock-check"
    />
    <VBtn
      type="submit"
      :loading="isLoading"
      :disabled="isLoading"
      color="success"
      :text="t('common.confirm')"
    />
  </VForm>
</template>