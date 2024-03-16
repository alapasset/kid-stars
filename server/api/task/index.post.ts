import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { TaskForm } from '~/types/task'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ message: 'User not found', statusCode: 401 })

  const body: TaskForm = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  if (body.tutor === undefined) throw createError({ statusCode: 400, statusMessage: 'No tutor data' })
  if (body.family === undefined) throw createError({ statusCode: 400, statusMessage: 'No family data' })

  const { data: tutorData, error } = await client.from('family_member').select('id').eq('id', body.tutor).maybeSingle()
  if (error) throw createError(error.message)
  if (!tutorData) throw createError({ statusCode: 400, statusMessage: 'No tutor found' })

  const { error: taskError } = await client.from('task').insert({ description: body.description, family: body.family, name: body.name, points: body.points, status: body.status, tutor: tutorData.id }).single()

  if(taskError) throw createError({ message: 'Could not insert data', statusCode: 500 })
})
