<script lang="ts" setup>
import type { UserLoginForm } from '~/types/user'

const { t } = useI18n()

const runtimeConfig = useRuntimeConfig()
const redirectTo = `${runtimeConfig.public.DEPLOY_PRIME_URL}/confirm`
const supabase = useSupabaseClient()

const { handleSubmit } = useForm<UserLoginForm>()
const { notifyError } = useNotifications()

const { value: email, errorMessage: errorMessageEmail } = useField<string>(
  'email',
  inputValue => {
    const emailValidationRegExp = /^[\w!#$%&'*+./=?^`{|}~-]+@[\d.A-Za-z-]+$/mu
    if (inputValue.length === 0) return t('form.error.email.required')
    if (!emailValidationRegExp.test(inputValue)) return t('form.error.email.invalid')
    return true
  },
)

const { value: password, errorMessage: errorMessagePassword } = useField<string>(
  'password',
  inputValue => {
    if (inputValue.length === 0) return t('form.error.password.required')
    return true
  },
)

const onSubmit = handleSubmit(async (values) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })

  if (error) notifyError(error.message)
})


async function signInWithOauth () {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  })
  if (error) throw createError(error)
}
</script>

<template>
  <div class="card mx-auto w-96 border bg-base-100 shadow-xl">
    <div class="card-body">
      <form
        class="flex flex-col gap-4"
        novalidate
        @submit.prevent="onSubmit"
      >
        <h2 class="card-title">
          {{ t('common.login') }}
        </h2>

        <CoreInputText
          v-model="email"
          :error-messages="errorMessageEmail"
          icon="material-symbols:mail"
          :label="t('form.label.email')"
          :placeholder="t('form.label.email')"
          required
          type="email"
        />

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
          type="submit"
        >
          {{ t('common.confirm') }}
        </button>
      </form>


      <div class="divider">
        {{ t('common.or') }}
      </div>

      <button
        class="btn flex justify-start bg-[#558aed] p-0.5"
        type="button"
        @click="signInWithOauth"
      >
        <Icon
          class="h-full w-12 rounded-md bg-white px-3"
          name="logos:google-icon"
        />
        <span class="text-white">
          {{ t('common.register-with-google') }}
        </span>
      </button>

      <div class="divider">
        {{ t('common.or') }}
      </div>

      <div>
        <p class="text-xs">
          {{ t('common.not-have-account') }}
        </p>
        <nuxt-link
          class="w-fit text-sm hover:text-[#42b883]"
          to="/register"
        >
          {{ t('common.register') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
