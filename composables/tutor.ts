import type { Tutor, TutorForm } from '~/types/member'

export function useTutorCheckCode () {
  const { notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (code: MaybeRef<string>) => {
      const codeReference = toRef(code)
      const body = { code: codeReference.value }
      await $fetch('/api/tutor/check-code/', { body, method: 'put' })
    },
    onError: () => { notifyError(t('member.check-code.error')) },
  })
}

export function useUpdateTutor (tutorId: MaybeRef<string>) {
  const tutorIdReference = toRef(tutorId)
  const queryClient = useQueryClient()
  const { notifySuccess } = useNotifications()
  const { t } = useI18n()
  const { updateMemberPseudo } = useCurrentMemberStore()

  return useMutation({
    mutationFn: async (data: TutorForm) => await $fetch<Tutor>(`/api/tutor/${tutorIdReference.value}`, { body: data, method: 'put' }),
    onError: () => { notifySuccess(t('notification.update.error')) },
    onSuccess: async (data: Tutor) => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
      updateMemberPseudo(data.pseudo)
      notifySuccess(t('notification.update.success'))
    },
  })
}
