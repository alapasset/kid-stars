<script setup lang="ts">
import type { FamilyMember } from '~/types/family';
import { useDeleteFamilyMember, useUpdateFamilyMember} from "~/composables/member";

const props = defineProps<{
  member: FamilyMember
}>()

const data = ref({...props.member})
const openDeleteDialog = ref(false);
const openUpdateDialog = ref(false);
const profile = computed(() => props.member.user === user.value?.id ? user.value?.user_metadata.avatar_url : null);
const showModal = ref(false);
const title = computed(() => props.member.user ? `Tuteur` : `Enfant`);
const user = useSupabaseUser();
const wrongCodeError = ref<string>(``);

const { handleSubmit, errors } = useForm();
const { mutation: updateFamilyMember } = useUpdateFamilyMember();
const { mutation: deleteFamilyMember } = useDeleteFamilyMember();
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

const onDelete = () => {
  openDeleteDialog.value = true;
}
const confirmDeletion = (memberId: string) => {
  deleteFamilyMember.mutate(memberId);
  openDeleteDialog.value = false;
}

const onFormSubmit = handleSubmit(async values => {
  updateFamilyMember.mutate({ data: data.value });
})
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
    <VCardActions>
      <div class="w-full flex justify-between">
        <VBtn
          icon
          @click.stop="openUpdateDialog = true"
        >
          <VIcon size="20" class="text-blue-600">mdi-pencil</VIcon>
        </VBtn>
        <VBtn
          v-if="!props.member.code"
          icon
          @click.stop="onDelete"
        >
          <VIcon size="20" class="text-red-600">mdi-delete</VIcon>
        </VBtn>
      </div>
    </VCardActions>
  </VCard>
  <VDialog
    v-model="openUpdateDialog"
    max-width="400"
  >
    <VForm
      class="flex flex-col gap-3"
      @submit.prevent="onFormSubmit"
    >
      <VCard>
        <VCardTitle>
          Modifier le membre de la famille
        </VCardTitle>
        <VCardText>
          <VTextField
            v-model="data.pseudo"
            required
            label="Pseudo"
            type="text"
            :error-messages="errors.pseudo"
            prepend-inner-icon="mdi-account"
          />
          <VTextField
            v-if="props.member.code"
            v-model="data.code"
            required
            label="Code de la session"
            type="text"
            :error-messages="errors.code"
            prepend-inner-icon="mdi-lock-outline"
          />
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="blue darken-1"
            @click="openUpdateDialog = false"
          >
            Annuler
          </VBtn>
          <VBtn
            type="submit"
            color="primary"
            @click="openUpdateDialog = false"
          >
            Valider
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </VDialog>
  <VDialog
    v-model="openDeleteDialog"
    max-width="400"
  >
    <VCard>
      <VCardTitle>
        Confirmer la suppression
      </VCardTitle>
      <VCardText>
        Êtes-vous sûr de vouloir supprimer le membre de la famille?
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn color="blue darken-1"  @click="openDeleteDialog = false">
          Annuler
        </VBtn>
        <VBtn color="blue darken-1"  @click="confirmDeletion(member.id)">
          Confirmer
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
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
