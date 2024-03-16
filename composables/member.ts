import type { FamilyMember } from '~/types/member'

export function useFetchFamilyMembers (familyId: MaybeRef<string>) {
  const familyReference = toRef(familyId)
  return useQuery({
    queryFn: async () => await $fetch<FamilyMember[]>(`/api/family/${familyReference.value}/members`),
    queryKey: ['family', 'get-all-family-member', familyReference.value],
  })
}

export function useDeleteFamilyMember () {
  const queryClient = useQueryClient()
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (memberId: MaybeRef<string>) => {
      const memberIdReference = toRef(memberId)
      return await $fetch(`/api/member/${memberIdReference.value}`, { method: 'delete' })
    },
    onError: () => { notifyError(t('notification.delete.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      notifySuccess(t('notification.delete.success'))
    },
  })
}
