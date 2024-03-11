import type { ChildCreationForm, FamilyMember, TutorCreationForm } from '~/types/family'
import type { MaybeRef } from 'vue'

export function useCreateChild () {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: ChildCreationForm) => await $fetch('/api/family/child', { method: 'post', body }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.save.success'))
    },
    onError: () => { notifyError(t('notification.save.error')) },
  })
}

export function useInviteTutor () {
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: TutorCreationForm) => await $fetch('/api/family/tutor', { method: 'post', body }),
    onSuccess: () => { notifySuccess(t('notification.invite.success')) },
    onError: () => { notifyError(t('notification.invite.error')) },
  })
}

export function useFetchFamilyMember (memberId: string) {
  return useQuery({
    queryKey: ['family', 'get-family-member', memberId],
    queryFn: async () => await $fetch(`/api/family/member/${memberId}`),
  })
}

export function useFetchFamilyMemberByUser (userId: MaybeRef<string | undefined>) {
  const userIdReference = toRef(userId)
  const isEnabled = Boolean(userIdReference.value)
  return useQuery({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: isEnabled,
    queryKey: ['family', 'get-family-member-by-user', userIdReference.value],
    queryFn: async () => await $fetch(`/api/family/member/user/${ userIdReference.value ?? '' }`),
  })
}
export function useDeleteFamilyMember () {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (memberId: string) => await $fetch(`/api/family/member/${memberId}`, { method: 'delete' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.delete.success'))
    },
    onError: () => { notifyError(t('notification.delete.error')) },
  })
}

export function useUpdateFamilyMember () {
  const queryClient = useQueryClient()
  const { notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (data: Partial<FamilyMember>) => await $fetch(`/api/family/member/${data.id ?? ''}`, { method: 'put', body: data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.update.success'))
    },
    onError: () => { notifySuccess(t('notification.update.error')) },
  })
}
