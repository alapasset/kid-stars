import type { FamilyMember } from "~/types/family";

export function useFetchFamilyMember(memberId: string) {
  return useQuery({
    queryKey: [`family`, `get-family-member`, memberId],
    queryFn: () => $fetch(`/api/family/member/${memberId}`),
    select: (data) => data as FamilyMember,
  })
}
