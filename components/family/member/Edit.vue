<script setup lang="ts">
import type { FamilyMember } from "~/types/family";

const props = defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()
const { notifyError, notifySuccess } = useNotifications()
const openDialog = ref(false);
const isTutor = computed(() => props.member.code !== null);
const { mutateAsync, isSuccess, isError } = useUpdateFamilyMember();

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


const onSubmit = handleSubmit(async () => {
  await mutateAsync(values);
  if(isSuccess.value) {
    openDialog.value = false;
    notifySuccess(t(`notification.save.success`))
  }
  if(isError.value) {
    notifyError(t(`notification.save.error`))
  }
})
</script>

<template>
  <div>
    <VBtn
      icon="mdi-pencil"
      color="primary"
      @click.stop="openDialog = true"
    />
    <VDialog
      v-model="openDialog"
      max-width="400"
    >
      <VForm
        class="flex flex-col gap-3"
        @submit.prevent="onSubmit"
      >
        <VCard>
          <VCardTitle>
            {{ t('family.member.edit.title') }}
          </VCardTitle>
          <VCardText>
            <VTextField
              v-model="pseudo"
              required
              :label="t('form.label.pseudo')"
              type="text"
              :error-messages="errorMessagePseudo"
              prepend-inner-icon="mdi-account"
            />
            <VTextField
              v-if="isTutor"
              v-model="code"
              required
              :label="t('form.label.code')"
              type="text"
              :error-messages="errorMessageCode"
              prepend-inner-icon="mdi-lock-outline"
            />
            <VTextField
              v-if="isTutor"
              v-model="confirmationCode"
              required
              :label="t('form.label.code')"
              type="text"
              :error-messages="errorMessageConfirmationCode"
              prepend-inner-icon="mdi-lock-outline"
            />
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn
              color="secondary"
              @click="openDialog = false"
            >
              {{ t('common.cancel') }}
            </VBtn>
            <VBtn
              type="submit"
              color="primary"
            >
              {{ t('common.confirm') }}
            </VBtn>
          </VCardActions>
        </VCard>
      </VForm>
    </VDialog>
  </div>
</template>
