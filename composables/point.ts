import type { LastPoint, Point, SumPoint } from '~/types/point'

export function useCreatePoint () {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async (body: Point) => await $fetch(`/api/family/member/${body.child}/point`, { method: 'post', body }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['point'] })
      notifySuccess(t('notification.update.success'))
    },
    onError: () => { notifyError(t('notification.save.error')) },
  })
}

export function useGetPoint (child: MaybeRef<string>, doCall: MaybeRef<boolean> = true) {
  const doCallReference = toRef(doCall)
  const childReference = toRef(child)
  return useQuery({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: doCallReference.value,
    queryKey: ['point', childReference.value],
    queryFn: async () => await $fetch<SumPoint[]>(`/api/point/${childReference.value}`, { method: 'get' }),
  })
}

export function useGetLastTransaction (child: MaybeRef<string>, doCall: MaybeRef<boolean>) {
  const childReference = toRef(child)
  const doCallReference = toRef(doCall)
  const isEnabled = Boolean(doCallReference.value)
  return useQuery({
    queryKey: ['last', childReference.value],
    queryFn: async () => await $fetch<LastPoint[]>(`/api/family/member/${childReference.value}/last-transaction`, { method: 'get' }),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: isEnabled,
  })
}
