<script setup lang="ts">
import type { FamilyMember, Tutor } from '~/types/member'

const props = defineProps<{
  tutor: Tutor
}>()

const tutor = toRef(props, 'tutor')

const { t } = useI18n()
const { isPending, isSuccess, mutateAsync } = useUpdateTutor(tutor.value.id)
const { isError: isWrongCode, isPending: isCheckingCode, mutateAsync: checkCode } = useTutorCheckCode()
const editDialog = ref<HTMLDialogElement>()

const { handleSubmit, values } = useForm<FamilyMember>({
  initialValues: {
    ...tutor.value,
    code: '',
  },
})

const { errorMessage: errorMessagePseudo, value: pseudo } = useField<string>(
  'pseudo',
  inputValue => {
    if(!inputValue || inputValue.length === 0) return t('form.error.pseudo.required')
    return true
  },
)

const { errorMessage: errorMessageCode, value: code } = useField<string>(
  'code',
  inputValue => {
    if(inputValue && !/^\d{6}$/u.test(inputValue)) return t('form.error.code.length')
    return true
  },
)

const { errorMessage: errorMessageActualCode, setErrors, value: actualCode } = useField<string>('actualCode')

const onSubmit = handleSubmit(async () => {
  await checkCode(actualCode)
  if(isWrongCode.value) {
    setErrors(t('form.error.code.wrong'))
    return
  }
  await mutateAsync(values)
  if(isSuccess.value) editDialog.value?.close()
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
