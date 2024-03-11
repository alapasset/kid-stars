import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { TaskCreationForm } from '~/types/task'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, message: 'User not found' })

  const body: TaskCreationForm = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  const { data: tutorData, error } = await client.from('family_member').select('id').eq('user', body.tutor).maybeSingle()
  if (error) throw createError(error.message)
  if (!tutorData) throw createError({ statusCode: 400, statusMessage: 'No member for this user' })

  const { error: taskError } = await client.from('task').insert({ ...body, tutor:tutorData.id }).single()

  if(taskError) throw createError({ statusCode: 500, message: 'Could not insert data' })
})
