<script lang="ts" setup>
import type { NuxtLink } from '#build/components';
import type { UserCreationForm } from '~/types/user';

const { t } = useI18n()

const runtimeConfig = useRuntimeConfig()
const redirectTo = `${runtimeConfig.public.DEPLOY_PRIME_URL}/confirm`
const supabase = useSupabaseClient()
const isLoading = ref(false)

const { handleSubmit } = useForm<UserCreationForm>()
const { notifyError, notifySuccess } = useNotifications()

const { value: email, errorMessage: errorMessageEmail } = useField<string>(
  `email`,
  inputValue => {
    const emailValidationRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (inputValue?.length === 0) return t(`form.error.email.required`)
    if (!emailValidationRegExp.test(inputValue)) return t(`form.error.email.invalid`)
    return true
  }
)

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

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  })

  if (error) {
    notifyError(error.message)
    throw createError(error)
  }

  if (data) {
    notifySuccess(t(`common.register-success`))
    isLoading.value = false
    navigateTo(`/`)
  }
})


const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: `google`,
    options: {
      redirectTo,
    },
  })
  if (error) {
    throw createError(error)
  }
}
</script>

<template>
  <VForm
    class="w-1/6 mt-10 mx-auto p-8 flex flex-col gap-4 rounded-lg bg-gray-100 border border-gray-600"
    @submit.prevent="onSubmit"
  >
    <h2 class="mb-5 text-lg font-medium">
      {{ t('common.register') }}
    </h2>

    <VTextField
      v-model="email"
      required
      :label="t('form.label.email')"
      type="email"
      :error-messages="errorMessageEmail"
      prepend-inner-icon="mdi-email"
    />
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

    <VDivider class="border-gray-900 my-3" />

    <VBtn
      type="button"
      color="primary"
      :prepend-icon="`mdi-google`"
      :text="t('common.register-with-google')"
      @click="signInWithOAuth"
    />

    <VDivider class="border-gray-900 my-3" />

    <div>
      <p class="mt-3 text-xs">
        {{ t('common.already-have-account') }}
      </p>
      <NuxtLink
        class="w-fit text-sm hover:text-[#42b883]"
        to="/login"
      >
        {{ t('common.login') }}
      </NuxtLink>
    </div>
  </VForm>
</template>
