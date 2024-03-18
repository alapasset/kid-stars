<script setup lang="ts">
import type { Activity } from '~/types/activity.js'
import type { Child } from '~/types/member.js'
import type { Point } from '~/types/point.js'

const props = defineProps<{
  activity:Activity
}>()

const activity = toRef(props, 'activity')
const selectedChildId = ref('')
const formDialog = ref<HTMLDialogElement>()
const openDialog = ref(false)

const { t } = useI18n()

const { isPending, mutateAsync } = useAddPoint(selectedChildId)

const { data: members } = useFetchFamilyMembers(activity.value.family)

const { handleSubmit, resetForm, setFieldValue } = useForm<Point>({
  initialValues: {
    activity: activity.value,
    points: -activity.value.points,
  },
})

const familyChilds = computed(() => members.value ? members.value.filter(member => member.role === 'child') : [])
function onOpenModal () {
  openDialog.value = true
  formDialog.value?.showModal()
}

function getPoint (childId: string) {
  const { data: point } = useGetPoints(childId)
  return point.value?.at(0)?.sum
}
function isDisabled (childId: string) {
  const point = getPoint(childId)
  return (point === undefined) ? false : point < activity.value.points
}

function setChild (child: Child) {
  setFieldValue('child', child)
  selectedChildId.value = child.id
}

function onCloseModal () {
  openDialog.value = false
  formDialog.value?.close()
  selectedChildId.value = ''
}

const onSubmit = handleSubmit(async values => {
  await mutateAsync(values)
  formDialog.value?.close()
  openDialog.value = false
  selectedChildId.value = ''
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
            {{ t('task.dashboard.form.title') }}
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
        <div
          v-if="familyChilds"
          class="flex justify-around gap-2"
        >
          <button
            v-for="child in familyChilds"
            :key="child.id"
            class="btn text-2xl"
            :class="{ 'btn-accent': child.id === selectedChildId }"
            :disabled="isDisabled(child.id)"
            type="button"
            @click="() => setChild(child)"
          >
            {{ child.pseudo }}
          </button>
        </div>
        <div class="flex flex-col gap-2 p-2">
          <button
            class="btn btn-primary btn-block"
            :disabled="!selectedChildId"
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
