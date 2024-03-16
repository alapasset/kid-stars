import type { Family } from './family'
import type { Child, Tutor } from './member'

export type TaskStatus = 'pending' | 'toBeValidated' | 'validated'

export interface Task {
  child?: Child
  createdAt: string
  description: string
  family: Family
  id: string
  name: string
  points: number
  status: TaskStatus
  tutor: Tutor
}

export interface TaskForm {
  child?: string
  description: string
  family?: string
  name: string
  points: number
  status: TaskStatus
  tutor?: string
}
