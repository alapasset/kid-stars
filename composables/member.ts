import type { ChildCreationForm, FamilyMember, TutorCreationForm } from "~/types/family";
import type {MaybeRef} from "vue";

export function useCreateChild() {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (body: ChildCreationForm) => $fetch(`/api/family/child`, { method: `post`, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`family`] })
      notifySuccess(t(`notification.save.success`))
    },
    onError: () => notifyError(t(`notification.save.error`)),
  })
}

export function useInviteTutor() {
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (body: TutorCreationForm) => $fetch(`/api/family/tutor`, { method: `post`, body }),
    onSuccess: () => notifySuccess(t(`notification.invite.success`)),
    onError: () => notifyError(t(`notification.invite.error`)),
  })
}

export function useFetchFamilyMember(memberId: string) {
  return useQuery({
    queryKey: [`family`, `get-family-member`, memberId],
    queryFn: () => $fetch(`/api/family/member/${memberId}`),
    select: (data) => data as FamilyMember,
  })
}

export function useFetchFamilyMemberByUser(userId: MaybeRef<string | undefined>) {
  const userIdRef = toRef(userId);
  const enabled = !!userIdRef.value
  return useQuery({
    enabled,
    queryKey: [`family`, `get-family-member-by-user`, userIdRef.value],
    queryFn: () => $fetch(`/api/family/member/user/${ userIdRef.value }`),
    select: (data) => data as FamilyMember,
  })
}
export function useDeleteFamilyMember() {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (memberId: string) => $fetch(`/api/family/member/${memberId}`, { method: `delete` }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`family`] })
      notifySuccess(t(`notification.delete.success`))
    },
    onError: () => notifyError(t(`notification.delete.error`)),
  });
}

export function useUpdateFamilyMember() {
  const queryClient = useQueryClient()
  const { notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (data: Partial<FamilyMember>) => $fetch(`/api/family/member/${data.id}`, { method: `put`, body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`family`] })
      notifySuccess(t(`notification.update.success`))
    },
    onError: () => notifySuccess(t(`notification.update.error`))
  });
}
