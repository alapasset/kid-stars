import { useCurrentFamilyMemberStore } from '~/storage/user'
import { storeToRefs } from 'pinia'
// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware(async () => {
  const currentFamilyMemberStore = useCurrentFamilyMemberStore()
  const { currentFamilyMember, isLogged } = storeToRefs(currentFamilyMemberStore)

  if (!currentFamilyMember.value) return await navigateTo('/current-family-member')
  if (!isLogged.value) return await navigateTo('/login-family-member')

})
