import type { Activity, ActivityForm } from '~/types/activity.js'

export function useCreateActivity () {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: ActivityForm) => await $fetch('/api/activity', { method: 'post', body }),
    onError: () => { notifyError(t('notification.save.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activity'] })
      notifySuccess(t('notification.save.success'))
    },
  })
}

export function useFetchActivitiesByFamily (familyId: MaybeRef<string>){
  const familyReference = toRef(familyId)

  return useQuery({
    queryKey: ['activity'],
    queryFn: async () => await $fetch<Activity []>(`/api/family/${familyReference.value}/activities`, { method: 'get' }),
  })
}

export function useUpdateActivity (activityId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()
  const activityIdReference = toRef(activityId)

  return useMutation({
    mutationFn: async (data: ActivityForm) => await $fetch(`/api/activity/${activityIdReference.value}`, { method: 'put', body: data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activity'] })
      notifySuccess(t('notification.update.success'))
    },
    onError: () => { notifyError(t('notification.update.error')) },
  })
}

export function useDeleteActivity (activityId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()
  const activityIdReference = toRef(activityId)

  return useMutation({
    mutationFn: async () => {
      await $fetch(`/api/activity/${activityIdReference.value}`, { method: 'delete' })
    },
    onError: () => { notifyError(t('notification.delete.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activity'] })
      notifySuccess(t('notification.delete.success'))
    },
  })
}
