<script setup lang="ts">
import type { TaskCreationForm } from '~/types/task'

const props = defineProps<{
  familyId: string
}>()

const { familyId } = toRefs(props)
const { mutateAsync, isPending } = useCreateTask()

const { t } = useI18n()
const user = useSupabaseUser()

const { handleSubmit, resetForm } = useForm<TaskCreationForm>({
  initialValues: {
    tutor: user.value?.id,
    family: familyId.value,
    status: 'pending',
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

const isDisabled = computed(() => !name.value || !description.value || !points.value)

const onSubmit = handleSubmit(async (values) => {
  await mutateAsync(values)
  resetForm()
})

function onPointUpdate (value: string) {
  setValue(Number(value))
}
</script>

<template>
  <div class="max-w-80">
    <h3 class="text-lg font-bold">
      {{ t('task.admin.form.title') }}
    </h3>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="onSubmit"
    >
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
      <button
        class="btn btn-primary"
        :disabled="isDisabled"
        type="submit"
      >
        <span
          v-if="isPending"
          class="loading loading-spinner"
        />
        {{ t('common.add') }}
      </button>
      <button
        class="btn btn-secondary"
        type="reset"
      >
        {{ t('common.cancel') }}
      </button>
    </form>
  </div>
</template>
