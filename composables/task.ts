import type { Task, TaskCreationForm } from '~/types/task'

export function useCreateTask () {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: TaskCreationForm) => await $fetch('/api/task', { method: 'post', body }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['task'] })
      notifySuccess(t('notification.save.success'))
    },
    onError: () => { notifyError(t('notification.save.error')) },
  })
}

export function useFetchTasksByFamily (familyId: MaybeRef<string>){
  const familyReference = toRef(familyId)

  return useQuery({
    queryKey: ['task'],
    queryFn: async () => await $fetch<Task []>(`/api/task/${familyReference.value}`, { method: 'get' }),
  })
}

export function useUpdateTask () {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (data: Partial<Task>) => await $fetch(`/api/task/${data.id ?? ''}`, { method: 'put', body: data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['task'] })
      notifySuccess(t('notification.update.success'))
    },
    onError: () => { notifyError(t('notification.update.error')) },
  })
}

