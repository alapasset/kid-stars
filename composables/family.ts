import type { Family, FamilyCreationForm } from "~/types/family";

export function useCreateFamily() {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (body: FamilyCreationForm) => $fetch(`/api/family`, { method: `post`, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`family`] })
      notifySuccess(t(`notification.save.success`))
    },
    onError: () => notifyError(t(`notification.save.error`)),
  })
}

export function useJoinFamily(familyId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const familyRef = toRef(familyId)
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (body: FamilyCreationForm) => $fetch(`/api/family/${familyRef.value}/join`, { method: `post`, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`family`] })
      notifySuccess(t(`notification.save.success`))
    },
    onError: () => notifyError(t(`notification.save.error`)),
  })
}

export function useFetchFamily(familyId: MaybeRef<string>) {
  const familyRef = toRef(familyId)

  return useQuery({
    enabled: !!familyRef.value,
    queryKey: [`family`, `get-one-family`, familyRef.value],
    queryFn: () => $fetch(`/api/family/${familyRef.value}`),
    select: (data) => data as Family,
  })
}

export function useFetchFamilies() {
  return useQuery({
    queryKey: [`family`, `get-all-family`],
    queryFn: () => {
      const req = $fetch(`/api/family/all`)
      return req as Promise<{ family: string }[]>
    },
  })
}
