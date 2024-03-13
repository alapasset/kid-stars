<script setup lang="ts">
import { familyMemberRole, type FamilyMember } from '~/types/family'

const props = defineProps<{
  member: FamilyMember
}>()

const { member } = toRefs(props)

const { t } = useI18n()
const isTutor = computed(() => member.value.role === familyMemberRole.tutor)
const { mutateAsync, isSuccess, isPending } = useUpdateFamilyMember()
const { mutateAsync: checkCode, isError: isWrongCode, isPending: isCheckingCode } = useMemberCheckCode()
const editDialog = ref<HTMLDialogElement>()

const { values, handleSubmit } = useForm<FamilyMember>({
  initialValues: {
    ...member.value,
    code: '',
  },
})

const { value: pseudo, errorMessage: errorMessagePseudo } = useField<string>(
  'pseudo',
  inputValue => {
    if(!inputValue || inputValue.length === 0) return t('form.error.pseudo.required')
    return true
  },
)

const { value: code, errorMessage: errorMessageCode } = useField<string>(
  'code',
  inputValue => {
    if(!/^\d{6}$/u.test(inputValue)) return t('form.error.code.legnth')
    return true
  },
)

const { value: actualCode, errorMessage: errorMessageActualCode, setErrors } = useField<string>('actualCode')

function openModal () {
  editDialog.value?.showModal()
}

function closeModal () {
  editDialog.value?.close()
}

const onSubmit = handleSubmit(async () => {
  if (isTutor.value) {
    await checkCode(actualCode)

    if(isWrongCode.value) {
      setErrors(t('form.error.code.wrong'))
      return
    }
  }

  await mutateAsync(values)
  if(isSuccess.value) editDialog.value?.close()
})
</script>

<template>
  <div>
    <button
      class="btn btn-circle btn-ghost "
      type="button"
      @click.stop="openModal"
    >
      <Icon
        class="size-7 md:size-9"
        name="material-symbols:box-edit-outline"
      />
    </button>
    <dialog
      ref="editDialog"
      class="modal"
    >
      <div class="modal-box flex flex-col gap-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold">
            {{ t('family.member.edit.title') }}
          </h3>
          <form method="dialog">
            <button class="btn btn-circle btn-ghost btn-sm" type="submit">
              <Icon
                class="size-5"
                name="material-symbols:close"
              />
            </button>
          </form>
        </div>
        <div class="flex flex-col gap-5">
          <CoreInputText
            v-model="pseudo"
            :error-messages="errorMessagePseudo"
            icon="material-symbols:person"
            :label="t('form.label.pseudo')"
            :placeholder="t('form.label.pseudo')"
            required
          />
          <CoreInputText
            v-if="isTutor"
            v-model="code"
            :error-messages="errorMessageCode"
            icon="material-symbols:lock"
            :label="t('form.label.new-code')"
            :placeholder="t('form.label.new-code')"
            type="password"
          />
          <CoreInputText
            v-if="isTutor"
            v-model="actualCode"
            :error-messages="errorMessageActualCode"
            icon="material-symbols:shield-lock"
            :label="t('form.label.actual-code')"
            :placeholder="t('form.label.actual-code')"
            required
            type="password"
          />
        </div>
        <div class="flex flex-col gap-2 p-2">
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
          <button
            class="btn btn-secondary btn-block"
            type="button"
            @click="closeModal"
          >
            {{ t('common.cancel') }}
          </button>
        </div>
      </div>
      <form
        class="modal-backdrop"
        method="dialog"
      >
        <button type="submit">close</button>
      </form>
    </dialog>
  </div>
</template>
