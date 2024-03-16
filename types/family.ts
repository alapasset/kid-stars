import type { FamilyMember, FamilyMemberRole } from './member'

export interface Family {
  id: string
  members: FamilyMember[]
  name: string
}

export interface FamilyForm {
  code: string
  name: string
  pseudo: string
  role: FamilyMemberRole
}

export interface FamilyInvitationForm {
  invitedEmail: string
}
