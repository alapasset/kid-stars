import type { FamilyMember } from "~/types/family";

export function useFetchFamilyMember(memberId: string) {
  return useQuery({
    queryKey: [`family`, `get-family-member`, memberId],
    queryFn: () => $fetch(`/api/family/member/${memberId}`),
    select: (data) => data as FamilyMember,
  })
}

export function useDeleteFamilyMember() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (memberId: string) => $fetch(`/api/family/member/${memberId}`, { method: `delete` }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`family`] })
    },
  });

  return { mutation };
}

export function useUpdateFamilyMember() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ data }: { data: Partial<FamilyMember> }) => $fetch(`/api/family/member/${data.id}`, { method: `put`, body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`family`] })
    },
  });

  return { mutation };
}
