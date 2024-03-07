<script lang="ts" setup>
import type { NuxtLink } from '#build/components';
import { BUTTON_COLOR, BUTTON_TYPE } from '~/types/button';
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
  <div class="card w-96 bg-base-100 shadow-xl mx-auto border">
    <div class="card-body">
      <form
        novalidate
        class="flex flex-col gap-4"
        @submit.prevent="onSubmit"
      >
        <h2 class="card-title">
          {{ t('common.register') }}
        </h2>

        <CoreInputText
          v-model="email"
          required
          :label="t('form.label.email')"
          :placeholder="t('form.label.email')"
          type="email"
          :error-messages="errorMessageEmail"
          icon="material-symbols:mail"
        />

        <CoreInputText
          v-model="password"
          required
          :label="t('form.label.password')"
          :placeholder="t('form.label.password')"
          type="password"
          :error-messages="errorMessagePassword"
          :hint="t('form.hint.password')"
          icon="material-symbols:lock"
        />

        <CoreInputText
          v-model="confirmationPassword"
          required
          :label="t('form.label.confirmation-password')"
          :placeholder="t('form.label.confirmation-password')"
          type="password"
          :error-messages="errorMessageConfirmationPassword"
          icon="material-symbols:shield-lock"
        />

        <CoreButton
          :type="BUTTON_TYPE.submit"
          :color="BUTTON_COLOR.primary"
          :is-pending="isLoading"
          :disabled="isLoading"
        >
          {{ t('common.confirm') }}
        </CoreButton>
      </form>
      <div class="divider">
        {{ t('common.or') }}
      </div>

      <CoreButton
        class="p-0.5 bg-[#558aed] flex justify-start"
        @click="signInWithOAuth"
      >
        <Icon
          class="bg-white rounded-md h-full w-12 px-3"
          name="logos:google-icon"
        />
        <span class="text-white">
          {{ t('common.register-with-google') }}
        </span>
      </CoreButton>

      <div class="divider">
        {{ t('common.or') }}
      </div>

      <div>
        <p class="text-xs">
          {{ t('common.already-have-account') }}
        </p>
        <NuxtLink
          class="w-fit text-sm hover:text-[#42b883]"
          to="/login"
        >
          {{ t('common.login') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
