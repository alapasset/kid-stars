<script setup lang="ts">
import type { FamilyMember } from '~/types/family'
import type { PointCreationForm } from '~/types/point'
import { useCreatePoint, useGetPoint } from '~/composables/point'

const props = defineProps<{
  member: FamilyMember
}>()

const { member } = toRefs(props)

const openDialog = ref(false)
const { data: point, refetch } = useGetPoint(member.value.id, openDialog)
const { mutateAsync, isPending } = useCreatePoint()
const { t } = useI18n()
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const minusValues = [-25, -10, -5, -1]
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const plusValues = [1, 5, 10, 25]
const pointDialog = ref<HTMLDialogElement>()
const initialValue = computed(() => point.value?.at(0)?.sum ?? 0)

const { handleSubmit, resetForm } = useForm<PointCreationForm>({
  initialValues: {
    child: member.value.id,
    points: 0,
  },
})

const { value: points, errorMessage: errorMessagePoints, setValue } = useField<number>(
  'points',
  (value) => {
    if(value + initialValue.value < 0) return t('form.error.points.minValue')
    return true
  },
)

const currentPoints = computed(() => initialValue.value + Number(points.value))
const disabled = computed(() => isPending.value || !points.value || currentPoints.value < 0)


const onSubmit = handleSubmit(async values => {
  await mutateAsync(values)
  pointDialog.value?.close()
  openDialog.value = false
  resetForm()
})

async function openModal () {
  resetForm()
  openDialog.value = true
  pointDialog.value?.showModal()
  await refetch()
}

function addPoint (value: number) {
  points.value = value
}

function onCloseModal () {
  pointDialog.value?.close()
}

function onPointUpdate (value: string) {
  setValue(Number(value))
}
</script>

<template>
  <div>
    <button
      class="btn btn-circle btn-ghost "
      type="button"
      @click.stop="openModal"
    >
      <Icon
        class="size-7 md:size-9"
        name="material-symbols:copyright"
      />
    </button>
    <dialog
      ref="pointDialog"
      class="modal"
    >
      <div class="modal-box flex flex-col gap-5">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold">
            {{ t('family.member.point.title') }}
          </h3>
          <form method="dialog">
            <button class="btn btn-circle btn-ghost btn-sm" type="submit">
              <Icon
                class="size-5"
                name="material-symbols:close"
              />
            </button>
          </form>
        </div>
        <div class="flex items-center gap-2">
          <p class="font-bold">
            {{ t('family.member.point.current-points') }} :
          </p>
          <div class="badge badge-outline p-4 text-lg font-bold">
            {{ initialValue }}
          </div>
        </div>
        <div>
          <span>{{ t('family.member.point.add-remove') }}</span>
          <div class="badge badge-outline mx-2 p-3 font-bold">
            {{ member.pseudo }}
          </div>
          <span>?</span>
        </div>
        <div class="flex flex-col items-center gap-4">
          <div class="flex gap-2">
            <button
              v-for="value in plusValues"
              :key="value"
              class="btn btn-circle btn-success"
              type="button"
              @click="() => addPoint(value)"
            >
              {{ value }}
            </button>
          </div>
          <CoreInputText
            class="mx-3"
            :error-messages="errorMessagePoints"
            :label="t('family.member.point.points')"
            :model-value="String(points)"
            :placeholder="t('family.member.point.points')"
            type="number"
            @update:model-value="onPointUpdate"
          />
          <div class="flex gap-2">
            <button
              v-for="value in minusValues"
              :key="value"
              class="btn btn-circle btn-error"
              type="button"
              @click="() => addPoint(value)"
            >
              {{ value }}
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <p class="font-bold">
            {{ t('family.member.point.new-points') }} :
          </p>
          <div
            class="badge badge-outline p-4 text-lg font-bold"
            :class="currentPoints >= 0 ? `badge-success` : `badge-error`"
          >
            {{ currentPoints }}
          </div>
        </div>
        <div class="flex flex-col gap-2 p-2">
          <button
            class="btn btn-primary btn-block"
            :disabled
            type="button"
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
            type="button"
            @click="onCloseModal"
          >
            {{ t('common.cancel') }}
          </button>
        </div>
      </div>
      <form
        class="modal-backdrop"
        method="dialog"
      >
        <button type="submit">close</button>
      </form>
    </dialog>
  </div>
</template>
