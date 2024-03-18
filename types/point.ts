import type { Activity } from './activity.js'
import type { Child } from './member'
import type { Task } from './task'

export interface Point {
  activity: Activity
  child: Child
  points: number
  task: Task
}

export type PointForm = Pick<Point, 'points'>
export type LastPoint = Pick<Point, 'points'>

export interface SumPoint {
  sum: number
}

export const minusPointValues = [-25, -10, -5, -1]
export const plusPointValues = [1, 5, 10, 25]
