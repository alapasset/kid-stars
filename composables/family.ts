import type { FamilyCreationForm, FamilyMember, FamilyWithItems } from '~/types/family'

export function useCreateFamily () {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: FamilyCreationForm) => await $fetch('/api/family', { method: 'post', body }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.save.success'))
    },
    onError: () => { notifyError(t('notification.save.error')) },
  })
}

export function useJoinFamily (familyId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const familyReference = toRef(familyId)
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: FamilyCreationForm) => await $fetch(`/api/family/${familyReference.value}/join`, { method: 'post', body }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.save.success'))
    },
    onError: () => { notifyError(t('notification.save.error')) },
  })
}

export function useFetchFamily (familyId: MaybeRef<string>) {
  const familyReference = toRef(familyId)

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: Boolean(familyReference.value),
    queryKey: ['family', 'get-one-family', familyReference.value],
    queryFn: async () => await $fetch<FamilyWithItems>(`/api/family/${familyReference.value}`),
  })
}

export function useFetchFamilies () {
  return useQuery({
    queryKey: ['family', 'get-all-family'],
    queryFn: async () => await $fetch<Partial<FamilyMember>[]>('/api/family/all'),
  })
}
