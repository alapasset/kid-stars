export type TaskStatus = 'pending' | 'toBeValidated' | 'validated'

export interface TaskCreationForm {
  description: string
  family: string
  name: string
  points: number
  status: TaskStatus
  tutor: string
}

export interface ChildMember {
  pseudo: string
}

export interface TutorMember {
  pseudo: string
}

export interface Task {
  child: string
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
