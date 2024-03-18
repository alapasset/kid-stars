<script lang="ts" setup>
import type { Task, TaskForm } from '~/types/task.js'

const props = defineProps<{ task: Task }>()
const task = toRef(props, 'task')

const { t } = useI18n()

const valdiationDialog = ref<HTMLDialogElement>()

const { isPending, mutateAsync } = useValidateTask(task.value.id)

function openModal () {
  valdiationDialog.value?.showModal()
}

const { values } = useForm<TaskForm>({
  initialValues: {
    child: task.value.child?.id,
    description: task.value.description,
    name: task.value.name,
    points: task.value.points,
    status: task.value.status,
  },
})
async function onSubmit () {
  await mutateAsync(values)
  valdiationDialog.value?.close()
}
</script>

<template>
  <div>
    <Icon
        class="size-7 hover:cursor-pointer md:size-9"
        name="material-symbols:check-circle"
        @click="openModal"
    />
    <dialog
      ref="valdiationDialog"
      class="modal"
    >
      <div class="modal-box flex flex-col gap-5">
        <form
          class="flex flex-col gap-5"
          @submit.prevent="onSubmit"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold">
              {{ t('task.admin.form.validate.title') }}
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
          <span>
            {{ t('task.admin.form.validate.message') }}
          </span>
          <button
            class="btn btn-primary"
            :disabled="isPending"
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
        <button type="submit"></button>
      </form>
    </dialog>
  </div>
</template>
