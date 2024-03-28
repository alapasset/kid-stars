<script setup lang="ts">
import type { Activity } from '~/types/activity.js'
import type { Child, FamilyMember } from '~/types/member.js'
import type { Point } from '~/types/point.js'


const props = defineProps<{
  activity:Activity
  currentMember: FamilyMember
}>()

const activity = toRef(props, 'activity')
const currentMember = toRef(props, 'currentMember')
const currentChild = ref<Child>(currentMember.value)
const formDialog = ref<HTMLDialogElement>()
const openDialog = ref(false)

const { t } = useI18n()

const { isPending, mutateAsync } = useAddPoint(currentMember.value.id)
const { data: point } = useGetPoints(currentMember.value.id)
const points = computed(() => point.value?.at(0)?.sum ?? 0)

const canBuy = computed(() => points.value >= activity.value.points)
const { handleSubmit, resetForm } = useForm<Point>({
  initialValues: {
    child: currentChild.value,
    activity: activity.value,
    points: -activity.value.points,
  },
})

function onOpenModal () {
  openDialog.value = true
  formDialog.value?.showModal()
}

function onCloseModal () {
  openDialog.value = false
  formDialog.value?.close()
}

const onSubmit = handleSubmit(async values => {
  await mutateAsync(values)
  formDialog.value?.close()
  openDialog.value = false
  resetForm()
})
</script>

<template>
  <div>
      <div
        class="flex h-full rounded-lg border-2 p-4 hover:cursor-pointer"
        @click="onOpenModal"
      >
        <div class="ml-2 w-full">
          <div class="flex w-full justify-between pb-2">
            <h4
              class="text-base font-semibold tracking-normal underline"
            >
              {{ activity.name }}
            </h4>
            <h5 class="font-bold">{{ activity.points }} {{ t('task.item.point') }}</h5>
          </div>
          <div class="flex w-full justify-between pb-2 font-bold">
            <p class="text-sm font-normal tracking-normal">{{ activity.description }}</p>
          </div>
        </div>
      </div>
      <dialog ref="formDialog" class="modal">
        <div class="modal-box flex flex-col gap-5">
        <div class="flex w-full justify-between">
          <h3 class="text-lg font-bold">
            {{ canBuy ? t('task.dashboard.form.title.enoughPoints') : t('task.dashboard.form.title.notEnoughPoints') }}
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
        <div class="flex flex-col gap-2 p-2">
          <button
            class="btn btn-primary btn-block"
            :disabled="!canBuy"
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
        <button type="submit"></button>
      </form>
      </dialog>
   </div>
</template>
