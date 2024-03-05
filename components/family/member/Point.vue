<script setup lang="ts">
import type { FamilyMember } from "~/types/family";
import type { PointCreationForm } from "~/types/point";
import { useCreatePoint, useGetPoint } from "~/composables/point";

const props = defineProps<{
  member: FamilyMember
}>()

const openDialog = ref(false);
const { data: point, refetch } = useGetPoint(props.member.id, openDialog);
const { mutateAsync, isPending } = useCreatePoint();
const { t } = useI18n()
const minusValues = [-25, -10, -5, -1]
const plusValues = [1, 5, 10, 25]

const { handleSubmit, resetForm } = useForm<PointCreationForm>({
  initialValues: {
    child: props.member.id,
    points: 0
  }
})

const { value: points, errorMessage: errorMessagePoints } = useField<number>(
  `points`,
  () => {
    if(newPoints.value < 0) return t(`form.error.points.minValue`)
    return true
  }
)

const initialValue = computed(() => point.value ? point.value[0].sum : 0);
const newPoints = computed(() => initialValue.value + Number(points.value));
const disabled = computed(() => isPending.value || !points.value || newPoints.value < 0);

const onSubmit = handleSubmit(async values => {
  await mutateAsync(values)
  openDialog.value = false
  resetForm()
})

const openModal = () => {
  resetForm()
  openDialog.value = true
  refetch()
}
const addPoint = (value: number) => {
  points.value = value
}
</script>

<template>
  <div>
    <VBtn
      icon="mdi-wrench"
      class="text-green-600"
      @click.stop="openModal"
    />
    <VDialog
      v-model="openDialog"
      max-width="400"
      class="flex justify-center items-center"
    >
      <VCard>
        <VCardTitle>
          {{ t('family.member.point.title') }}
        </VCardTitle>
        <VCardText class="flex flex-col gap-5">
          <div class="flex gap-2 items-center">
            <p class="font-bold">
              {{ t('family.member.point.current-points') }} :
            </p>
            <VChip
              color="indigo"
            >
              <span class="text-lg font-bold">{{ initialValue }}</span>
            </VChip>
          </div>
          <div>
            <span>{{ t('family.member.point.add-remove') }}</span>
            <VChip class="mx-2">
              <span class="font-bold">
                {{ props.member.pseudo }}
              </span>
            </VChip>
            <span>?</span>
          </div>
          <VForm
            class="flex flex-col gap-4 items-center"
            @submit.prevent="onSubmit"
          >
            <div class="flex gap-2">
              <VBtn
                v-for="value in plusValues"
                :key="value"
                color="success"
                @click="addPoint(value)"
              >
                {{ value }}
              </VBtn>
            </div>
            <VTextField
              v-model="points"
              class="mx-3"
              :hide-details="true"
              :error-messages="errorMessagePoints"
              type="number"
              :label="t('family.member.point.points')"
            />
            <div class="flex gap-2">
              <VBtn
                v-for="value in minusValues"
                :key="value"
                color="error"
                @click="addPoint(value)"
              >
                {{ value }}
              </VBtn>
            </div>
          </VForm>
          <div class="flex gap-2 items-center">
            <p class="font-bold">
              {{ t('family.member.point.new-points') }} :
            </p>
            <VChip
              :color="newPoints >= 0 ? `success` : `error`"
            >
              <span class="text-lg font-bold">{{ newPoints }}</span>
            </VChip>
          </div>
        </VCardText>
        <div class="flex flex-col gap-2 p-2">
          <VBtn
            :disabled="disabled"
            :loading="isPending"
            color="primary"
            block
            @click="onSubmit"
          >
            {{ t('common.confirm') }}
          </VBtn>
          <VBtn
            block
            color="secondary"
            @click="openDialog = false"
          >
            {{ t('common.cancel') }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>
