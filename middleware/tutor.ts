// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware(async () => {
  const currentFamilyMemberStore = useCurrentFamilyMemberStore()
  const { currentFamilyMember } = storeToRefs(currentFamilyMemberStore)

  if (currentFamilyMember.value?.role !== 'tutor') return await navigateTo('/dashboard')
})
