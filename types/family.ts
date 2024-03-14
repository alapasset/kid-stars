export type FamilyMemberRole = 'child' | 'tutor'

export interface FamilyCreationForm {
  code: string
  name: string
  pseudo: string
  role: FamilyMemberRole
}

export interface FamilyMember {
  code?: string | null
  family: string
  id: string
  pseudo: string
  role: FamilyMemberRole
  user?: string
}

export interface FamilyWithItems {
  members: FamilyMember[]
  name: string
}

export interface Family {
  familyMember: FamilyMember[]
  id: string
  name: string
}

export interface ChildCreationForm {
  pseudo: string
  role: FamilyMemberRole
}

export interface TutorCreationForm {
  invitedEmail: string
}
