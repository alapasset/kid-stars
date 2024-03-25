import type { LastPoint, Point, PointForm, SumPoint } from '~/types/point'

export function useGetPoints (child: MaybeRef<string>, doCall: MaybeRef<boolean> = true) {
  const doCallReference = toRef(doCall)
  const childReference = toRef(child)
  return useQuery({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: doCallReference.value,
    queryFn: async () => await $fetch<SumPoint[]>(`/api/point/child/${childReference.value}`, { method: 'get' }),
    queryKey: ['point', childReference.value],
  })
}

export function useFetchPointByFamily (familyId: MaybeRef<string>) {
  const familyIdReference = toRef(familyId)

  return useQuery({
    queryFn: async () => await $fetch<Point[]>(`/api/point/family/${familyIdReference.value}`, { method: 'get' }),
    queryKey: ['point', familyIdReference],
  })
}

export function useGetLastTransaction (child: MaybeRef<string>, doCall: MaybeRef<boolean>) {
  const childReference = toRef(child)
  const doCallReference = toRef(doCall)
  const isEnabled = Boolean(doCallReference.value)
  return useQuery({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: isEnabled,
    queryFn: async () => await $fetch<LastPoint[]>(`/api/point/child/${childReference.value}/last-transaction`, { method: 'get' }),
    queryKey: ['point', 'last-transaction', childReference.value],
  })
}

export function useAddPoint (childId: MaybeRef<string>) {
  const childIdReference = toRef(childId)
  const queryClient = useQueryClient()
  const { notifyError, notifySuccess } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: PointForm) => {
      await $fetch(`/api/point/child/${childIdReference.value}`, { body, method: 'post' })
    },
    onError: () => { notifyError(t('notification.save.error')) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['point'] })
      notifySuccess(t('notification.update.success'))
    },
  })
}
