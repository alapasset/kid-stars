<script lang="ts" setup>
import { type Task, type TaskUpdateForm, taskStatus, type TaskStatus } from '~/types/task.js'
import type { FamilyMember } from '~/types/family.js'

const props = defineProps<{ task: Task }>()
const { task } = toRefs(props)
const { t } = useI18n()
const editDialog = ref<HTMLDialogElement>()
const familyId = ref(task.value.family)
const selectedMemberId = ref<string | null>(task.value.child)

const { data: members } = useFetchFamilyMembers(familyId)
const { mutateAsync, isPending } = useUpdateTask()

const statusOptions = computed(() => Object.keys(taskStatus))
const filteredMembers = computed(() => members.value ? members.value.filter(member => member.role === 'child') : [])

const { values, handleSubmit, setFieldValue } = useForm<TaskUpdateForm>({
  initialValues: {
    id: task.value.id,
    name: task.value.name,
    description: task.value.description,
    points: task.value.points,
    status: task.value.status,
    child: task.value.child,
  },
})

const { value: name, errorMessage: errorMessageName } = useField<string>(
  'name',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.task.name.required')
    return true
  },
)

const { value: description, errorMessage: errorMessageDescription } = useField<string>(
  'description',
  inputValue => {
    if(inputValue && inputValue.length === 0) return t('form.error.task.description.required')
    return true
  },
)

const { value: points, errorMessage: errorMessagePoint, setValue } = useField<number>(
  'points',
  inputValue => {
    if(inputValue === 0) return t('form.error.task.points.required')
    if (inputValue < 0) return t('form.error.task.points.minValue')
    return true
  },
)
const { value: status, errorMessage: errorMessageStatus } = useField<TaskStatus>(
  'status',
  inputValue => {
    if ((inputValue !== statusOptions.value.find(status => status === inputValue) || (inputValue === taskStatus.pending && values.child !== null)))
      return t('form.error.task.status.invalid')

    return true
  },
)

function onPointUpdate (value: string) {
  setValue(Number(value))
}
const isDisabled = computed(() => !name.value || !description.value || !points.value)

function setChildValue (value: FamilyMember) {
  setFieldValue('child', value.id)
  if(value.id) selectedMemberId.value = value.id
}
function resetChildValue () {
  // eslint-disable-next-line unicorn/no-null
  setFieldValue('child', null)
  // eslint-disable-next-line unicorn/no-null
  selectedMemberId.value = null
}

function openModal () {
  editDialog.value?.showModal()
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
              Editer une tâche
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
          <p class="font-bold">A qui attribuer la tache?</p>
          <div
              v-if="filteredMembers"
              class="flex flex-wrap justify-around gap-2"
            >
              <button
                v-for="member in filteredMembers"
                :key="member.id"
                class="btn text-2xl"
                :class="{ 'btn-accent': member.id === selectedMemberId }"
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
                Ne pas attribuer ?
              </button>
          </div>
          <div>
            <p class="pb-4 font-bold">Mettre à jour le status?</p>
            <label class="form-control w-full" for="status">
              <select v-model="status" class="select select-bordered" name="status">
                <option v-for="(value, key) in statusOptions" :key :value>
                  {{ value }}
                </option>
              </select>
              <p v-if="errorMessageStatus" class="text-red-500">{{ errorMessageStatus }}</p>
            </label>
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
          >
            {{ t('common.cancel') }}
          </button>
        </form>
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
