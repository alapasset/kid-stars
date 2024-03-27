/* eslint-disable consistent-return */
export default defineNuxtRouteMiddleware(async () => {
  // skip middleware on server beceause localstorage is not available
  if (process.server !== undefined && process.server) return

  const currentFamilyMemberStore = useCurrentFamilyMemberStore()
  const { currentFamilyMember, isLogged } = storeToRefs(currentFamilyMemberStore)

  if (!currentFamilyMember.value) return await navigateTo('/current-family-member')
  if (!isLogged.value) return await navigateTo('/login-family-member')
})
