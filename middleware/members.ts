/* eslint-disable consistent-return */
export default defineNuxtRouteMiddleware(async () => {
  // skip middleware on server beceause localstorage is not available
  if (process.server !== undefined && process.server) return

  const currentMemberStore = useCurrentMemberStore()
  const { currentMember, isLogged } = storeToRefs(currentMemberStore)

  if (!currentMember.value) return await navigateTo('/current-family-member')
  if (!isLogged.value) return await navigateTo('/login-family-member')
})
