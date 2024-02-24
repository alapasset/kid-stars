export interface FamilyCreationForm {
  name: string
  pseudo: string
  code: string
  confirmationCode: string
}

export interface FamilyMember {
  id: string
  family: string
  user?: string
  code?: string
  pseudo: string
}

export interface Family {
  id: string
  name: string
  family_member: FamilyMember[]
}

export interface ChildCreationForm {
  pseudo: string
}
