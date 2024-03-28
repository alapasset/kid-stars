import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FamilyMember } from '~/types/member'

export const useCurrentMemberStore = defineStore('currentMemberStore', () => {
  const currentMember = ref<FamilyMember | undefined>(undefined)
  const isLogged = ref(false)

  function connectMember () {
    isLogged.value = true
  }

  function disconnectMember () {
    isLogged.value = false
  }

  function setMember (userToSet: FamilyMember) {
    currentMember.value = userToSet
  }

  function clearMember () {
    currentMember.value = undefined
    disconnectMember()
  }

  function updateMemberPseudo (pseudo: string) {
    if (currentMember.value) currentMember.value.pseudo = pseudo
  }

  return {
    isLogged,
    setMember,
    clearMember,
    currentMember,
    connectMember,
    disconnectMember,
    updateMemberPseudo,
  }
}, { persist: { storage: persistedState.localStorage } })
