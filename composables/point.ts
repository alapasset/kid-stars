import type {LastPoint, Point, SumPoint} from "~/types/point";
import type {MaybeRef} from "vue";

export function useCreatePoint() {
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (body: Point) => $fetch(`/api/family/member/${body.child}/point`, { method: `post`, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`point`] })
      notifySuccess(t(`notification.update.success`))
    },
    onError: (error) => notifyError(error.message),
  });
}

export function useGetPoint(child: MaybeRef<string>, doCall: MaybeRef<boolean> = true) {
  const doCallRef = toRef(doCall);
  const childRef = toRef(child);
  return useQuery<SumPoint[], Error>({
    enabled: doCallRef.value,
    queryKey: [`point`, childRef.value],
    queryFn: () => $fetch(`/api/point/${childRef.value}`, { method: `get` }),
  });
}

export function useGetLastTransaction(child: MaybeRef<string>) {
  const childRef = toRef(child);
  return useQuery<LastPoint[], Error>({
    queryKey: [`last`, childRef.value],
    queryFn: () => $fetch(`/api/family/member/${childRef.value}/last-transaction`, { method: `get` }),
  });
}
