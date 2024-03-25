export type FamilyMemberRole = 'child' | 'tutor'

export interface FamilyMember {
  avatar?: string
  code?: string | null
  family: string
  id: string
  pseudo: string
  role: FamilyMemberRole
  user?: string
}

export type Child = Pick<FamilyMember, 'avatar' | 'id' | 'pseudo'>
export type ChildForm = Pick<FamilyMember, 'pseudo'>

export type Tutor = Pick<FamilyMember, 'avatar' | 'code' | 'id' | 'pseudo'>
export type TutorForm = Pick<FamilyMember, 'code' | 'pseudo'>
