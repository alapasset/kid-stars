<script setup lang="ts">
import type { Task } from '~/types/task.js'
import type { FamilyMember } from '~/types/family.js'

const props = defineProps<{
  task: Task
}>()
const { task } = toRefs(props)
const { t } = useI18n()

const familyId = ref(task.value.family)
const formDialog = ref<HTMLDialogElement>()
const openDialog = ref(false)
const selectedMemberId = ref(task.value.child)


const { data: members } = useFetchFamilyMembers(familyId)
const { mutateAsync, isPending } = useUpdateTask()

const { values, handleSubmit, setFieldValue } = useForm<Task>({
  initialValues: {
    id: task.value.id,
    status: 'toBeValidated',
  },
})

const statusClass = computed(() => {
  if (task.value.status === 'validated')
    return 'border-green-600'

  if (task.value.status === 'toBeValidated')

    return 'border-amber-400'

  return 'border-red-600'
})

const filteredMembers = computed(() => members.value ? members.value.filter(member => member.role === 'child') : [])
const isValidated = computed(() => task.value.status === 'validated')

function setValue (value: FamilyMember) {
  setFieldValue('child', value.id)
  if(value.id) selectedMemberId.value = value.id
}

function onOpenModal () {
  openDialog.value = true
  formDialog.value?.showModal()
}

function onCloseModal () {
  openDialog.value = false
  formDialog.value?.close()
  selectedMemberId.value = ''
}

const onSubmit = handleSubmit(async () => {
  await mutateAsync(values)
  formDialog.value?.close()
  openDialog.value = false
})
</script>

<template>
  <div class="auto-rows-max">
    <div
      class="flex h-full rounded-lg border-2 p-4 hover:cursor-pointer"
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
            <h5 class="font-bold">{{ task.points }} points</h5>
          </div>
          <div class="flex w-full justify-between pb-2 font-bold">
            <p class="text-sm font-normal tracking-normal">{{ task.description }}</p>
            <p>{{ task.childMember?.pseudo || t('task.dashboard.card.emptyChild') }}</p>
          </div>
        </div>
        <div>
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
          v-if="filteredMembers"
          class="flex justify-around gap-2"
        >
          <button
            v-for="member in filteredMembers"
            :key="member.id"
            class="btn text-2xl"
            :class="{ 'btn-accent': member.id === selectedMemberId }"
            type="button"
            @click="() => setValue(member)"
          >
            {{ member.pseudo }}
          </button>
        </div>
        <div class="flex flex-col gap-2 p-2">
          <button
            class="btn btn-primary btn-block"
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
