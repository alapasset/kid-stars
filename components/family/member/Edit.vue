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
    ...props.member
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
    if(isTutor.value && inputValue?.length < 4) return t(`form.error.code.minLegnth`);
    return true
  }
);

const { value: confirmationCode, errorMessage: errorMessageConfirmationCode } = useField<string>(
`confirmationCode`,
  inputValue => {
    if(isTutor.value && code.value !== inputValue) return t(`form.error.code.same`);
    return true
  }
);

const openModal = () => {
  editDialog.value?.showModal()
}

const onSubmit = handleSubmit(async () => {
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
            required
            :label="t('form.label.code')"
            :placeholder="t('form.label.code')"
            :error-messages="errorMessageCode"
            icon="material-symbols:lock"
          />
          <CoreInputText
            v-if="isTutor"
            v-model="confirmationCode"
            required
            :label="t('form.label.code')"
            :placeholder="t('form.label.code')"
            :error-messages="errorMessageConfirmationCode"
            icon="material-symbols:shield-lock"
          />
        </div>
        <div class="flex flex-col gap-2 p-2">
          <CoreButton
            :type="`submit`"
            :color="`primary`"
            :shape="`block`"
            :text="t('common.confirm')"
            :is-pending="isPending"
            @click="onSubmit"
          />
          <CoreButton
            :color="`secondary`"
            :shape="`block`"
            :text="t('common.cancel')"
            @click="editDialog?.close()"
          />
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
