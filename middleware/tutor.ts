// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware(async () => {
  const currentMemberStore = useCurrentMemberStore()
  const { currentMember } = storeToRefs(currentMemberStore)

  if (currentMember.value?.role !== 'tutor') return await navigateTo('/dashboard')
})
