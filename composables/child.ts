import type { Child, ChildForm } from '~/types/member'

export function useFetchChild (childId: MaybeRef<string>) {
  const childIdReference = toRef(childId)
  return useQuery({
    queryFn: async () => await $fetch<Child>(`/api/child/${childIdReference.value}`),
    queryKey: ['family', 'get-child', childIdReference.value],
  })
}

export function useCreateChild (familyId: MaybeRef<string>) {
  const familyIdReference = toRef(familyId)
  const queryClient = useQueryClient()
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: ChildForm) => await $fetch(`/api/family/${familyIdReference.value}/child`, { body, method: 'post' }),
    onError: () => { notifyError(t('notification.save.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.save.success'))
    },
  })
}

export function useUpdateChild (childId: MaybeRef<string>) {
  const childIdReference = toRef(childId)
  const queryClient = useQueryClient()
  const { notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (data: ChildForm) => await $fetch(`/api/child/${childIdReference.value}`, { body: data, method: 'put' }),
    onError: () => { notifySuccess(t('notification.update.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.update.success'))
    },
  })
}
