<script setup lang="ts">
import type {FamilyMember} from "~/types/family";

const props = defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()

const data = ref(props.member)
const openDialog = ref(false);

const { handleSubmit, errors } = useForm();
const { mutateAsync } = useUpdateFamilyMember();

const onSubmit = handleSubmit(async () => {
  await mutateAsync({ data: data.value });
  openDialog.value = false;
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
              v-model="data.pseudo"
              required
              :label="t('form.label.pseudo')"
              type="text"
              :error-messages="errors.pseudo"
              prepend-inner-icon="mdi-account"
            />
            <VTextField
              v-if="props.member.code"
              v-model="data.code"
              required
              :label="t('form.label.code')"
              type="text"
              :error-messages="errors.code"
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
