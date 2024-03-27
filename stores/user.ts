import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FamilyMember } from '~/types/member'

export const useCurrentFamilyMemberStore = defineStore('currentFamilyMemberStore', () => {
  const currentFamilyMember = ref<FamilyMember | undefined>(undefined)
  const isLogged = ref(false)

  function connectFamilyMember () {
    isLogged.value = true
  }

  function disconnectFamilyMember () {
    isLogged.value = false
  }

  function setFamilyMember (userToSet: FamilyMember) {
    currentFamilyMember.value = userToSet
  }

  function clearFamilyMember () {
    currentFamilyMember.value = undefined
    disconnectFamilyMember()
  }

  return {
    isLogged,
    setFamilyMember,
    clearFamilyMember,
    currentFamilyMember,
    connectFamilyMember,
    disconnectFamilyMember,
  }
}, { persist: { storage: persistedState.localStorage } })
