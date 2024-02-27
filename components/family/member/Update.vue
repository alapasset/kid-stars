<script setup lang="ts">
import type {FamilyMember} from "~/types/family";

const props = defineProps<{
  member: FamilyMember
}>()

const data = ref({...props.member})
const openDialog = ref(false);

const { handleSubmit, errors } = useForm();
const { mutation: updateFamilyMember } = useUpdateFamilyMember();

const onSubmit = handleSubmit(async () => {
  updateFamilyMember.mutate({ data: data.value });
})
</script>

<template>
  <div>
    <VBtn
      icon
      @click.stop="openDialog = true"
    >
      <VIcon size="20" class="text-blue-600">mdi-pencil</VIcon>
    </VBtn>
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
              @click="openDialog = false"
            >
              Annuler
            </VBtn>
            <VBtn
              type="submit"
              color="primary"
              @click="openDialog = false"
            >
              Valider
            </VBtn>
          </VCardActions>
        </VCard>
      </VForm>
    </VDialog>
  </div>
</template>
