<script setup lang="ts">
import type { FamilyMember } from '~/types/family';

const props = defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()

const isTutor = computed(() => !!props.member.code);
const profile = computed(() => props.member.user === user.value?.id ? user.value?.user_metadata.avatar_url : null);
const title = computed(() => props.member.user ? t(`family.tutor`) : t(`family.child`));
const isGoodCode = computed(() => code.value === props.member.code);

const showModal = ref(false);
const user = useSupabaseUser();

const { handleSubmit } = useForm();

const { value: code, errorMessage: errorMessageCode, setErrors } = useField<string>(
  `code`,
  inputValue => {
    if(inputValue?.length < 4) return t(`form.error.code.required`);
    return true;
  }
);

const onSubmit = handleSubmit(() => {
  if (!isGoodCode.value) {
    setErrors(t(`form.error.code.wrong`));
    return;
  }
  navigateTo(`/family/member/${props.member.id}`)
});

const onClickCard = () => {
  if(isTutor.value) {
    showModal.value = true
    return
  }
  navigateTo(`/family/member/${props.member.id}`);
}
</script>

<template>
  <VCard
    v-if="props.member"
    width="200"
    @click="onClickCard"
  >
    <VAvatar
      rounded="0"
      size="200"
      color="grey"
      :image="profile"
      :text="props.member.pseudo.slice(0,2).toUpperCase()"
    />
    <div class="flex justify-between items-center px-2">
      <VCardTitle>{{ props.member.pseudo }}</VCardTitle>
      <VChip>{{ title }}</VChip>
    </div>
    <VCardActions>
      <div class="w-full flex justify-between">
        <FamilyMemberPoint
          v-if="!isTutor"
          :member="props.member"
        />
        <FamilyMemberEdit
          :member="props.member"
        />
        <FamilyMemberDelete
          v-if="!isTutor"
          :member-id="props.member.id"
        />
      </div>
    </VCardActions>
  </VCard>
  <VDialog
    v-model="showModal"
    width="300"
  >
    <VCard class="flex flex-col gap-3">
      <VCardTitle class="text-center border-2 border-gray-100">
        {{ t('family.member.item.title') }}
      </VCardTitle>
      <VCardText class="flex flex-col gap-3">
        <VTextField
          v-model="code"
          :label="t('form.label.code')"
          type="number"
          :error-messages="errorMessageCode"
          prepend-inner-icon="mdi-lock-outline"
        />
        <VBtn
          width="300"
          color="primary"
          @click="onSubmit"
        >
          {{ t('common.confirm') }}
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
