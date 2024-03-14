export const taskStatus = {
  validated: 'validated',
  toBeValidated: 'toBeValidated',
  pending: 'pending',
} as const

export type TaskStatus = keyof typeof taskStatus

export interface TaskCreationForm {
  description: string
  family: string
  name: string
  points: number
  status: TaskStatus
  tutor: string
}

export interface TaskUpdateForm {
  child: string | null
  description: string
  id: string
  name: string
  points: number
  status: TaskStatus
}
export interface ChildMember {
  pseudo: string
}

export interface TutorMember {
  pseudo: string
}

export interface Task {
  child: string | null
  childMember: ChildMember
  createdAt: string
  description: string
  family: string
  id: string
  name: string
  points: number
  status: TaskStatus
  tutor: string
  tutorMember: TutorMember
}
