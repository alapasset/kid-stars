import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types.js'
import type { Task } from '~/types/task.js'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  const client = await serverSupabaseClient<Database>(event)
  const body: Partial<Task> = await readBody(event)
  if (body.id === undefined) throw createError({ statusCode: 400, statusMessage: 'Missing id' })

  const { error } = await client.from('task').update(body).eq('id', body.id)
  if (error) throw createError(error)
})
