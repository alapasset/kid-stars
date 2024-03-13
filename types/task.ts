export interface TaskCreationForm {
  description: string
  family: string
  name: string
  points: number
  tutor: string
}

export interface TaskFamilyMember {
  pseudo: string
}

export interface Task {
  child?: string
  createdAt: string
  description: string
  family: string
  familyMember: TaskFamilyMember
  id?: string
  name: string
  points: number
  tutor: string
}
