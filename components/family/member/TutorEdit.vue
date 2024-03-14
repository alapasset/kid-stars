<script setup lang="ts">
import type { FamilyMember } from '~/types/family'

const user = useSupabaseUser()
const { data: member } = useFetchFamilyMemberByUser(user.value?.id)

const { t } = useI18n()
const { mutateAsync, isSuccess, isPending } = useUpdateFamilyMember()
const { mutateAsync: checkCode, isError: isWrongCode, isPending: isCheckingCode } = useMemberCheckCode()
const editDialog = ref<HTMLDialogElement>()

const { values, handleSubmit } = useForm<FamilyMember>({
  initialValues: {
    ...member.value,
    code: '',
  },
})

const { value: pseudo, errorMessage: errorMessagePseudo, setValue } = useField<string>(
  'pseudo',
  inputValue => {
    if(!inputValue || inputValue.length === 0) return t('form.error.pseudo.required')
    return true
  },
)

const { value: code, errorMessage: errorMessageCode } = useField<string>(
  'code',
  inputValue => {
    if(inputValue && !/^\d{6}$/u.test(inputValue)) return t('form.error.code.length')
    return true
  },
)

const { value: actualCode, errorMessage: errorMessageActualCode, setErrors } = useField<string>('actualCode')

const onSubmit = handleSubmit(async () => {
  await checkCode(actualCode)
  if(isWrongCode.value) {
    setErrors(t('form.error.code.wrong'))
    return
  }
  await mutateAsync(values)
  if(isSuccess.value) editDialog.value?.close()
})

watch(member, () => {
  if(member.value) setValue(member.value.pseudo)
})
</script>

<template>
  <div class="max-w-80">
    <h3 class="text-lg font-bold">
      {{ t('me.admin.title') }}
    </h3>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="onSubmit"
    >
      <CoreInputText
        v-model="pseudo"
        :error-messages="errorMessagePseudo"
        icon="material-symbols:person"
        :label="t('form.label.pseudo')"
        :placeholder="t('form.label.pseudo')"
        required
      />
      <CoreInputText
        v-model="code"
        :error-messages="errorMessageCode"
        icon="material-symbols:lock"
        :label="t('form.label.new-code')"
        :placeholder="t('form.label.new-code')"
        type="password"
      />
      <CoreInputText
        v-model="actualCode"
        :error-messages="errorMessageActualCode"
        icon="material-symbols:shield-lock"
        :label="t('form.label.actual-code')"
        :placeholder="t('form.label.actual-code')"
        required
        type="password"
      />
      <button
        class="btn btn-primary btn-block"
        :disabled="isPending"
        type="button"
        @click="onSubmit"
      >
        <span
          v-if="isPending || isCheckingCode"
          class="loading loading-spinner"
        />
        {{ t('common.confirm') }}
      </button>
    </form>
  </div>
</template>
