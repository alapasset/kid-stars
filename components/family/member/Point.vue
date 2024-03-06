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
    <button
      class="btn btn-ghost btn-circle "
      @click.stop="openModal"
    >
      <Icon
        class="w-10 h-10"
        name="material-symbols:copyright"
      />
    </button>
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
            <button class="btn btn-sm btn-circle btn-ghost">
              <Icon
                class="w-5 h-5"
                name="material-symbols:close"
              />
            </button>
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
            <button
              v-for="value in plusValues"
              :key="value"
              class="btn btn-success btn-circle"
              @click="addPoint(value)"
            >
              {{ value }}
            </button>
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
            <button
              v-for="value in minusValues"
              :key="value"
              class="btn btn-error btn-circle"
              @click="addPoint(value)"
            >
              {{ value }}
            </button>
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
          <button
            class="btn btn-primary btn-block"
            :disabled="disabled"
            @click="onSubmit"
          >
            <span
              v-if="isPending"
              class="loading loading-spinner"
            />
            {{ t('common.confirm') }}
          </button>
          <button
            class="btn btn-secondary btn-block"
            @click="pointDialog?.close()"
          >
            {{ t('common.cancel') }}
          </button>
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
