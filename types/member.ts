export type FamilyMemberRole = 'child' | 'tutor'

export interface FamilyMember {
  code?: string | null
  family: string
  id: string
  pseudo: string
  role: FamilyMemberRole
  user?: string
}

export type Child = Pick<FamilyMember, 'id' | 'pseudo' >
export type ChildForm = Pick<FamilyMember, 'pseudo'>

export type Tutor = Pick<FamilyMember, 'code' | 'id' | 'pseudo'>
export type TutorForm = Pick<FamilyMember, 'code' | 'pseudo'>
