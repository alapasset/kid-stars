import type { Family, FamilyForm, FamilyInvitationForm } from '~/types/family'

export function useFetchFamily (familyId: MaybeRef<string>) {
  const familyReference = toRef(familyId)

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: Boolean(familyReference.value),
    queryFn: async () => await $fetch<Family>(`/api/family/${familyReference.value}`),
    queryKey: ['family', 'get-one-family', familyReference.value],
  })
}

export function useFetchFamilies () {
  return useQuery({
    queryFn: async () => await $fetch<Partial<Family>[]>('/api/family/all'),
    queryKey: ['family', 'get-all-family'],
  })
}

export function useCreateFamily () {
  const queryClient = useQueryClient()
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: FamilyForm) => await $fetch('/api/family', { body, method: 'post' }),
    onError: () => { notifyError(t('notification.save.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.save.success'))
    },
  })
}

export function useFamilyInvitation (familyId: MaybeRef<string>) {
  const familyIdRefence = toRef(familyId)
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: FamilyInvitationForm) => await $fetch(`/api/family/${familyIdRefence.value}/invitation`, { body, method: 'post' }),
    onError: () => { notifyError(t('notification.invite.error')) },
    onSuccess: () => { notifySuccess(t('notification.invite.success')) },
  })
}

export function useJoinFamily (familyId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const familyReference = toRef(familyId)
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: FamilyForm) => await $fetch(`/api/family/${familyReference.value}/join`, { body, method: 'post' }),
    onError: () => { notifyError(t('notification.save.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.save.success'))
    },
  })
}

