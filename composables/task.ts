import type { Task, TaskForm } from '~/types/task'

export function useFetchTasksByFamily (familyId: MaybeRef<string>){
  const familyReference = toRef(familyId)

  return useQuery({
    queryFn: async () => await $fetch<Task []>(`/api/family/${familyReference.value}/tasks`, { method: 'get' }),
    queryKey: ['task'],
  })
}

export function useCreateTask () {
  const queryClient = useQueryClient()
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: TaskForm) => await $fetch('/api/task', { body, method: 'post' }),
    onError: () => { notifyError(t('notification.save.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['task'] })
      notifySuccess(t('notification.save.success'))
    },
  })
}

export function useUpdateTask (taskId: MaybeRef<string>) {
  const taskIdReference = toRef(taskId)
  const queryClient = useQueryClient()
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (data: TaskForm) => await $fetch(`/api/task/${taskIdReference.value}`, { body: data, method: 'put' }),
    onError: () => { notifyError(t('notification.update.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['task'] })
      notifySuccess(t('notification.update.success'))
    },
  })
}

export function useDeleteTask (taskId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()
  const taskIdReference = toRef(taskId)

  return useMutation({
    mutationFn: async () => await $fetch(`/api/task/${taskIdReference.value}`, { method: 'delete' }),
    onError: () => { notifyError(t('notification.delete.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['task'] })
      notifySuccess(t('notification.delete.success'))
    },

  })
}

export function useValidateTask () {
  const queryClient = useQueryClient()
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (taskId: MaybeRef<string>) => {
      const taskIdReference = toRef(taskId)
      return await $fetch(`/api/task/${taskIdReference.value}/validation`, { method: 'put' })
    },
    onError: () => { notifyError(t('notification.delete.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['task'] })
      notifySuccess(t('notification.delete.success'))
    },

  })
}

