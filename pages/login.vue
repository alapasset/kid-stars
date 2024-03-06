<script lang="ts" setup>
import type { NuxtLink } from '#build/components';
import type { UserLoginForm } from '~/types/user';

const { t } = useI18n()

const runtimeConfig = useRuntimeConfig()
const redirectTo = `${runtimeConfig.public.DEPLOY_PRIME_URL}/confirm`
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const { handleSubmit } = useForm<UserLoginForm>()
const { notifyError } = useNotifications()

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
    if (inputValue?.length === 0) return t(`form.error.password.required`)
    return true
  }
)

const onSubmit = handleSubmit(async (values) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })

  if (error) { notifyError(error.message) }
})


const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: `google`,
    options: {
      redirectTo,
    },
  })
  if (error) {throw createError(error)}
}

watchEffect(() => {
  if (user.value) {
    return navigateTo(`/dashboard`)
  }
});
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl mx-auto border">
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

        <button
          type="submit"
          class="btn btn-primary"
        >
          {{ t('common.confirm') }}
        </button>
      </form>


      <div class="divider">
        {{ t('common.or') }}
      </div>

      <button
        class="btn p-0.5 bg-[#558aed] flex justify-start"
        @click="signInWithOAuth"
      >
        <Icon
          class="bg-white rounded-md h-full w-12 px-3"
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
        <NuxtLink
          class="w-fit text-sm hover:text-[#42b883]"
          to="/register"
        >
          {{ t('common.register') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
