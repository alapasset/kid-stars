<script setup lang="ts">
import type { FamilyMember } from "~/types/family";
import type { PointCreationForm } from "~/types/point";
import { useCreatePoint, useGetPoint } from "~/composables/point";

const props = defineProps<{
  member: FamilyMember
}>()

const openDialog = ref(false);
const { data: point, refetch } = useGetPoint(props.member.id, openDialog);
const { mutate } = useCreatePoint();
const { t } = useI18n()
const values = [-25, -10, -5, -1, 5, 10, 25, 50]
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

const onSubmit = handleSubmit(async values => {
  mutate(values)
  openDialog.value = false
  resetForm()
})

const openModal = () => {
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
      max-width="800"
      class="flex justify-center items-center"
    >
      <VCard>
        <VForm @submit.prevent="onSubmit">
          <VCardTitle>
            {{ t('family.member.point.title') }}
          </VCardTitle>
          <VCardText>
            <p class="font-bold">
              {{ t('family.member.point.currentPoints') }} :
            </p>
            <p>{{ initialValue }}</p>
          </VCardText>
          <VCardText>
            {{ t('family.member.point.addRemove.start') }} :
            <VChip>
              <p class="font-bold">
                {{ props.member.pseudo }}
              </p>
            </VChip>
            {{ t('family.member.point.addRemove.end') }} :
          </VCardText>
          <VCardActions class="flex justify-around items-center">
            <div class="w-10/12 flex flex-col justify-around items-center">
              <VChipGroup
                class="w-full"
                selected-class="text-deep-purple-accent-4"
              >
                <VRow class="w-full flex justify-around p-2">
                  <VChip
                    :class="`${value < 0 ? 'text-warning !important' : 'text-success !important'}`"
                    v-for="value in values"
                    :key="value"
                    @click="addPoint(value)"
                  >
                    {{ value }}
                  </VChip>
                </VRow>
              </VChipGroup>
              <VTextField
                v-model="points"
                :error-messages="errorMessagePoints"
                type="number"
                :label="t('family.member.point.points')"
                class="my-2"
              />
            </div>
          </VCardActions>
          <VCardText>
            <p class="font-bold">
              {{ t('family.member.point.newPoints') }} :
            </p>
            <p>{{ newPoints }}</p>
          </VCardText>
          <VCardActions class="flex justify-end">
            <VBtn
              color="secondary"
              @click="openDialog = false"
            >
              {{ t('common.cancel') }}
            </VBtn>
            <VBtn
              color="primary"
              type="submit"
            >
              {{ t('common.confirm') }}
            </VBtn>
          </VCardActions>
        </VForm>
      </VCard>
    </VDialog>
  </div>
</template>
