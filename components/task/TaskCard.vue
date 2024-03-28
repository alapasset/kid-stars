<script setup lang="ts">
import type { Child, FamilyMember } from '~/types/member.js'
import type { Task, TaskForm } from '~/types/task.js'

const props = defineProps<{
  currentMember: FamilyMember
  task: Task
}>()

const task = toRef(props, 'task')

const { t } = useI18n()

const currentMember = toRef(props, 'currentMember')
const currentChild = ref<Child>(currentMember.value)
const formDialog = ref<HTMLDialogElement>()
const openDialog = ref(false)
const selectedChildId = ref(task.value.child?.id)

const { isPending, mutateAsync } = useUpdateTask(task.value.id)

const { handleSubmit, values } = useForm<TaskForm>({
  initialValues: {
    child: currentChild.value.id,
    description: task.value.description,
    name: task.value.name,
    points: task.value.points,
    status: 'toBeValidated',
  },
})

const statusClass = computed(() => {
  if (task.value.status === 'validated') return 'border-green-600'
  if (task.value.status === 'toBeValidated') return 'border-amber-400'
  return 'border-red-600'
})

const isValidated = computed(() => task.value.status === 'validated')
const asChild = computed(() => task.value.child?.id !== undefined)
const isTutor = computed(() => currentMember.value.role === 'tutor')

function onOpenModal () {
  if (isTutor.value) return
  openDialog.value = true
  formDialog.value?.showModal()
}

function onCloseModal () {
  openDialog.value = false
  formDialog.value?.close()
  selectedChildId.value = ''
}

const onSubmit = handleSubmit(async () => {
  await mutateAsync(values)
  formDialog.value?.close()
  openDialog.value = false
})
</script>

<template>
  <div class="auto-rows-max">
    <div class="flex h-full rounded-lg border-2 p-4 hover:cursor-pointer"
      :class="statusClass"
      @click="onOpenModal">
        <svg
          v-if="isValidated"
          class="shrink-0 text-green-500"
          fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none"></path>
          <path d="M5 12l5 5l10 -10"></path>
        </svg>
        <div class="ml-2 w-full">
          <div class="flex w-full justify-between pb-2">
            <h4
              class="text-base font-semibold tracking-normal underline"
            >
              {{ task.name }}
            </h4>
            <h5 class="font-bold">{{ task.points }} {{ $t('task.item.point') }}</h5>
          </div>
          <div class="flex w-full justify-between pb-2 font-bold">
            <p class="text-sm font-normal tracking-normal">{{ task.description }}</p>
            <p>{{ task.child?.pseudo || t('task.dashboard.card.emptyChild') }}</p>
          </div>
        </div>
        <div>
      </div>
    </div>
    <dialog ref="formDialog" class="modal">
      <div class="modal-box flex flex-col gap-5">
        <div class="flex w-full justify-between">
          <h3 class="text-lg font-bold">
            {{ asChild ? t('task.dashboard.form.title.asChild') : t('task.dashboard.form.title.asNotChild')}}
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
            :disabled="asChild"
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
