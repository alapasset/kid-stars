export interface FamilyCreationForm {
  code: string
  name: string
  pseudo: string
}

export interface FamilyMember {
  code?: string | null
  family: string
  id: string
  pseudo: string
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
}
export interface TutorCreationForm {
  invitedEmail: string
}
