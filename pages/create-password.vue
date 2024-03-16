<script lang="ts" setup>
import type { UserPasswordForm } from '~/types/user'

const client = useSupabaseClient()
const { accessToken, refreshToken } = useGetTokens()
const { notifyError, notifySuccess } = useNotifications()
const { t } = useI18n()
const supabase = useSupabaseClient()
const isLoading = ref(false)

const { handleSubmit } = useForm<UserPasswordForm>()

const { errorMessage: errorMessagePassword, value: password } = useField<string>(
  'password',
  inputValue => {
    const passwordValidationRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/u
    if (inputValue.length === 0) return t('form.error.password.required')
    if (!passwordValidationRegExp.test(inputValue)) return t('form.error.password.invalid')
    return true
  },
)

const onSubmit = handleSubmit(async () => {
  isLoading.value = true

  if (accessToken === undefined || refreshToken === undefined) throw createError(t('common.error'))

  // eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
  const { error: sessionError } = await client.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })

  if (sessionError) {
    notifyError(t('notification.create-password.error'))
    isLoading.value = false
    throw createError(sessionError)
  }

  const { error: updateUserError } = await supabase.auth.updateUser({ password: password.value })
  if (updateUserError) {
    notifyError(t('notification.create-password.error'))
    isLoading.value = false
    throw createError(updateUserError)
  }

  notifySuccess(t('notification.create-password.success'))
  isLoading.value = false
  await navigateTo('/dashboard')
})
</script>

<template>
  <form
    class="mx-auto mt-10 flex max-w-sm flex-col gap-4 rounded-lg border border-gray-600 bg-gray-100 p-8"
    novalidate
    @submit.prevent="onSubmit"
  >
    <h2 class="mb-5 text-lg font-medium">
      {{ t('create-password.title') }}
    </h2>

    <CoreInputText
      v-model="password"
      :error-messages="errorMessagePassword"
      :hint="t('form.hint.password')"
      icon="material-symbols:lock"
      :label="t('form.label.password')"
      :placeholder="t('form.label.password')"
      required
      type="password"
    />

    <button
      class="btn btn-primary"
      :disabled="isLoading"
      type="submit"
    >
      <span
        v-if="isLoading"
        class="loading loading-spinner"
      />
      {{ t('common.confirm') }}
    </button>
  </form>
</template>
