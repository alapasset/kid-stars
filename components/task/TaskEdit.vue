<script lang="ts" setup>
import type { Task, TaskForm } from '~/types/task'
import type { FamilyMember } from '~/types/member'

const props = defineProps<{
  task: Task
}>()

const task = toRef(props, 'task')

const { t } = useI18n()

const editDialog = ref<HTMLDialogElement>()

const { data: members } = useFetchFamilyMembers(task.value.family.id)
const { isPending, mutateAsync } = useUpdateTask(task.value.id)

const selectedMember = ref<string | undefined>(task.value.child?.id)

const filteredMembers = computed(() => members.value ? members.value.filter(member => member.role === 'child') : [])

const { handleSubmit, setFieldValue, values } = useForm<TaskForm>({
  initialValues: {
    child: task.value.child?.id,
    description: task.value.description,
    name: task.value.name,
    points: task.value.points,
    status: task.value.status,
  },
})

const { errorMessage: errorMessageName, value: name } = useField<string>(
  'name',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.task.name.required')
    return true
  },
)

const { errorMessage: errorMessageDescription, value: description } = useField<string>(
  'description',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.task.description.required')
    return true
  },
)

const { errorMessage: errorMessagePoint, setValue, value: points } = useField<number>(
  'points',
  inputValue => {
    if(inputValue === 0) return t('form.error.task.points.required')
    if (inputValue < 0) return t('form.error.task.points.minValue')
    return true
  },
)

const isDisabled = computed(() => !name.value || !description.value || !points.value)

function onPointUpdate (value: string) {
  setValue(Number(value))
}

function setChildValue (value: FamilyMember) {
  setFieldValue('child', value.id)
  if(value.id) selectedMember.value = value.id
}

function resetChildValue () {
  setFieldValue('child', undefined)
  selectedMember.value = undefined
}

function openModal () {
  editDialog.value?.showModal()
}

function closeModal () {
  editDialog.value?.close()
}

const onSubmit = handleSubmit(async () => {
  await mutateAsync(values)
  editDialog.value?.close()
})
</script>

<template>
  <div>
    <Icon
        class="size-7 hover:cursor-pointer md:size-9"
        name="material-symbols:box-edit-outline"
        @click="openModal"
    />
    <dialog
      ref="editDialog"
      class="modal"
    >
      <div class="modal-box flex flex-col gap-5">
        <form
          class="flex flex-col gap-5"
          @submit.prevent="onSubmit"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold">
              {{ t('task.admin.form.edit.title') }}
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
          <div class="flex flex-col gap-5">
            <CoreInputText
              v-model="name"
              class="mx-3"
              :error-messages="errorMessageName"
              :label="t('form.label.task.name')"
              :placeholder="t('form.label.task.name')"
              type="text"
            />
          </div>
          <div class="flex flex-col gap-5">
            <CoreInputText
              v-model="description"
              class="mx-3"
              :error-messages="errorMessageDescription"
              :label="t('form.label.task.description')"
              :placeholder="t('form.label.task.description')"
              type="textarea"
            />
          </div>
          <div class="flex flex-col gap-5">
            <CoreInputText
              class="mx-3"
              :error-messages="errorMessagePoint"
              :label="t('form.label.task.points')"
              :model-value="String(points)"
              :placeholder="t('form.label.task.points')"
              type="number"
              @update:model-value="onPointUpdate"
            />
          </div>
          <p class="font-bold">{{ t('task.admin.form.edit.childField') }}</p>
          <div
              v-if="filteredMembers"
              class="flex flex-wrap justify-around gap-2"
            >
              <button
                v-for="member in filteredMembers"
                :key="member.id"
                class="btn text-2xl"
                :class="{ 'btn-accent': member.id === selectedMember }"
                type="button"
                @click="() => setChildValue(member)"
              >
                {{ member.pseudo }}
              </button>
              <button
                class="btn text-2xl"
                type="button"
                @click="resetChildValue"
              >
              {{ t('task.admin.form.edit.childFieldReset') }}
            </button>
          </div>
          <button
            class="btn btn-primary"
            :disabled="isDisabled"
            type="submit"
          >
          <span
            v-if="isPending"
            class="loading loading-spinner"
          />
            {{ t('common.confirm') }}
          </button>
          <button
            class="btn btn-secondary"
            type="reset"
            @click="closeModal"
          >
            {{ t('common.cancel') }}
          </button>
        </form>
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
