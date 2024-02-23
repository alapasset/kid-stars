import type { Family, FamilyCreationForm } from "~/types/family";

export function useCreateFamily() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: FamilyCreationForm) => $fetch(`/api/family`, { method: `post`, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`family`] })
    },
  })
}

export function useFetchFamily(familyId: string) {
  return useQuery({
    queryKey: [`family`, `get-one-family`, familyId],
    queryFn: () => $fetch(`/api/family/${familyId}`),
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
