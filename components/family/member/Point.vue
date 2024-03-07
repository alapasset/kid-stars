<script setup lang="ts">
import type { FamilyMember } from "~/types/family";
import type { PointCreationForm } from "~/types/point";
import { useCreatePoint, useGetPoint } from "~/composables/point";
import { BUTTON_COLOR, BUTTON_SHAPE, BUTTON_STATE, BUTTON_TYPE } from "~/types/button";

const props = defineProps<{
  member: FamilyMember
}>()

const openDialog = ref(false);
const { data: point, refetch } = useGetPoint(props.member.id, openDialog);
const { mutateAsync, isPending } = useCreatePoint();
const { t } = useI18n()
const minusValues = [-25, -10, -5, -1]
const plusValues = [1, 5, 10, 25]
const pointDialog = ref<HTMLDialogElement>()

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

const initialValue = computed(() => point.value?.at(0)?.sum ? point.value[0].sum : 0);
const newPoints = computed(() => initialValue.value + Number(points.value));
const disabled = computed(() => isPending.value || !points.value || newPoints.value < 0);

const onSubmit = handleSubmit(async values => {
  await mutateAsync(values)
  pointDialog.value?.close()
  openDialog.value = false
  resetForm()
})

const openModal = () => {
  resetForm()
  openDialog.value = true
  pointDialog.value?.showModal()
  refetch()
}
const addPoint = (value: number) => {
  points.value = value
}
</script>

<template>
  <div>
    <CoreButton
      :type="BUTTON_TYPE.button"
      :state="BUTTON_STATE.ghost"
      :shape="BUTTON_SHAPE.circle"
      @click.stop="openModal"
    >
      <Icon
        class="w-10 h-10"
        name="material-symbols:copyright"
      />
    </CoreButton>
    <dialog
      ref="pointDialog"
      class="modal"
    >
      <div class="modal-box flex flex-col gap-5">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">
            {{ t('family.member.point.title') }}
          </h3>
          <form method="dialog">
            <CoreButton
              class="absolute right-2 top-2"
              :type="BUTTON_TYPE.button"
              :state="BUTTON_STATE.ghost"
              :shape="BUTTON_SHAPE.circle"
              @click="pointDialog?.close()"
            >
              <Icon
                class="w-5 h-5"
                name="material-symbols:close"
              />
            </CoreButton>
          </form>
        </div>
        <div class="flex gap-2 items-center">
          <p class="font-bold">
            {{ t('family.member.point.current-points') }} :
          </p>
          <div class="badge badge-outline text-lg font-bold p-4">
            {{ initialValue }}
          </div>
        </div>
        <div>
          <span>{{ t('family.member.point.add-remove') }}</span>
          <div class="badge badge-outline mx-2 font-bold p-3">
            {{ props.member.pseudo }}
          </div>
          <span>?</span>
        </div>
        <div class="flex flex-col gap-4 items-center">
          <div class="flex gap-2">
            <CoreButton
              v-for="value in plusValues"
              :key="value"
              :color="BUTTON_COLOR.success"
              :shape="BUTTON_SHAPE.circle"
              @click="addPoint(value)"
            >
              {{ value }}
            </CoreButton>
          </div>
          <CoreInputText
            v-model="points"
            class="mx-3"
            :error-messages="errorMessagePoints"
            type="number"
            :label="t('family.member.point.points')"
            :placeholder="t('family.member.point.points')"
          />
          <div class="flex gap-2">
            <CoreButton
              v-for="value in minusValues"
              :key="value"
              :color="BUTTON_COLOR.error"
              :shape="BUTTON_SHAPE.circle"
              @click="addPoint(value)"
            >
              {{ value }}
            </CoreButton>
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <p class="font-bold">
            {{ t('family.member.point.new-points') }} :
          </p>
          <div
            class="badge badge-outline text-lg font-bold p-4"
            :class="newPoints >= 0 ? `badge-success` : `badge-error`"
          >
            {{ newPoints }}
          </div>
        </div>
        <div class="flex flex-col gap-2 p-2">
          <CoreButton
            :type="BUTTON_TYPE.submit"
            :color="BUTTON_COLOR.primary"
            :shape="BUTTON_SHAPE.block"
            :is-pending="isPending"
            :disabled="disabled"
            @click="onSubmit"
          >
            {{ t('common.confirm') }}
          </CoreButton>
          <CoreButton
            :color="BUTTON_COLOR.secondary"
            :shape="BUTTON_SHAPE.block"
            @click="pointDialog?.close()"
          >
            {{ t('common.cancel') }}
          </CoreButton>
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
