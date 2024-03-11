import type { LastPoint, Point, SumPoint } from '~/types/point'
import type { MaybeRef } from 'vue'

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
    onError: (error) => { notifyError(error.message) },
  })
}

export function useGetPoint (child: MaybeRef<string>, doCall: MaybeRef<boolean> = true) {
  const doCallReference = toRef(doCall)
  const childReference = toRef(child)
  return useQuery<SumPoint[]>({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: doCallReference.value,
    queryKey: ['point', childReference.value],
    queryFn: async () => await $fetch(`/api/point/${childReference.value}`, { method: 'get' }),
  })
}

export function useGetLastTransaction (child: MaybeRef<string>, doCall: MaybeRef<boolean>) {
  const childReference = toRef(child)
  const doCallReference = toRef(doCall)
  const isEnabled = Boolean(doCallReference.value)
  return useQuery<LastPoint[]>({
    queryKey: ['last', childReference.value],
    queryFn: async () => await $fetch(`/api/family/member/${childReference.value}/last-transaction`, { method: 'get' }),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: isEnabled,
  })
}
