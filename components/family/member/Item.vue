<script setup lang="ts">
import type { FamilyMember } from '~/types/family';

const props = defineProps<{
  member: FamilyMember
}>()

const profile = computed(() => props.member.user === user.value?.id ? user.value?.user_metadata.avatar_url : null);
const showModal = ref(false);
const title = computed(() => props.member.user ? `Tuteur` : `Enfant`);
const user = useSupabaseUser();
const wrongCodeError = ref<string>(``);

const { handleSubmit, errors } = useForm();

const { value: code, errorMessage: errorMessageCode } = useField<string>(
  `code`,
  inputValue => {
    if(inputValue?.length < 4) return `Le code est obligatoire`;
    return true;
  }
);

const onSubmit = handleSubmit(values => {
  if (code.value === props.member.code) {
    navigateTo(`/family/member/${props.member.id}`)
    wrongCodeError.value = ``;
  } else {
    wrongCodeError.value = `Le code est incorrect, êtes vous sûr de votre saisie ?`;
  }
});

const onClickCard = () => {
  props.member.code ? showModal.value = true : navigateTo(`/family/member/${props.member.id}`);
}
</script>

<template>
  <VCard
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
  </VCard>
  <VDialog
    v-model="showModal"
    width="300"
  >
    <VCard class="flex flex-col gap-3">
      <VCardTitle class="text-center border-2 border-gray-100">
        Code de la session parent
      </VCardTitle>
      <VCardText class="flex flex-col gap-3">
        <VTextField
          v-model="code"
          label="Code de la session parent"
          type="number"
          :error-messages="errors.code || errorMessageCode || wrongCodeError"
          prepend-inner-icon="mdi-lock-outline"
        />
        <VBtn
          width="300"
          color="primary"
          @click="onSubmit"
        >
          Valider
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
