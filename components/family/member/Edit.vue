<script setup lang="ts">
import type { FamilyMember } from "~/types/family";

const props = defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()
const isTutor = computed(() => props.member.code !== null);
const { mutateAsync, isSuccess, isPending } = useUpdateFamilyMember();
const editDialog = ref<HTMLDialogElement>()

const { values, handleSubmit } = useForm<FamilyMember>({
  initialValues: {
    ...props.member,
    code: ``,
  }
});

const { value: pseudo, errorMessage: errorMessagePseudo } = useField<string>(
  `pseudo`,
  inputValue => {
    if(inputValue?.length === 0) return t(`form.error.pseudo.required`);
    return true
  }
);

const { value: code, errorMessage: errorMessageCode } = useField<string>(
`code`,
  inputValue => {
    if(isTutor.value && inputValue?.length > 0 && inputValue?.length < 4) return t(`form.error.code.min-length`);
    return true
  }
);

const { value: actualCode, errorMessage: errorMessageActualCode, setErrors } = useField<string>(`actualCode`);

const openModal = () => {
  editDialog.value?.showModal()
}

const onSubmit = handleSubmit(async () => {
  if(props.member.code !== actualCode.value) {
    setErrors(t(`form.error.code.wrong`));
    return
  }
  await mutateAsync(values);
  if(isSuccess.value) {
    editDialog.value?.close()
  }
})
</script>

<template>
  <div>
    <button
      class="btn btn-ghost btn-circle "
      @click.stop="openModal"
    >
      <Icon
        class="w-10 h-10"
        name="material-symbols:box-edit-outline"
      />
    </button>
    <dialog
      ref="editDialog"
      class="modal"
    >
      <div class="modal-box flex flex-col gap-5">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">
            {{ t('family.member.edit.title') }}
          </h3>
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost">
              <Icon
                class="w-5 h-5"
                name="material-symbols:close"
              />
            </button>
          </form>
        </div>
        <div class="flex flex-col gap-5">
          <CoreInputText
            v-model="pseudo"
            required
            :label="t('form.label.pseudo')"
            :placeholder="t('form.label.pseudo')"
            :error-messages="errorMessagePseudo"
            icon="material-symbols:person"
          />
          <CoreInputText
            v-if="isTutor"
            v-model="code"
            type="password"
            :label="t('form.label.new-code')"
            :placeholder="t('form.label.new-code')"
            :error-messages="errorMessageCode"
            icon="material-symbols:lock"
          />
          <CoreInputText
            v-if="isTutor"
            v-model="actualCode"
            type="password"
            required
            :label="t('form.label.actual-code')"
            :placeholder="t('form.label.actual-code')"
            :error-messages="errorMessageActualCode"
            icon="material-symbols:shield-lock"
          />
        </div>
        <div class="flex flex-col gap-2 p-2">
          <button
            class="btn btn-primary btn-block"
            :disabled="isPending"
            @click="onSubmit"
          >
            <span
              v-if="isPending"
              class="loading loading-spinner"
            />
            {{ t('common.confirm') }}
          </button>
          <button
            class="btn btn-secondary btn-block"
            @click="editDialog?.close()"
          >
            {{ t('common.cancel') }}
          </button>
        </div>
      </div>
      <form
        method="dialog"
        class="modal-backdrop"
      >
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
