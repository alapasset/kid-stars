import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { ActivityForm } from '~/types/activity.js'
import type { Database } from '~/types/database.types'


export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, message: 'User not found' })

  const body: ActivityForm = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  const { error: taskError } = await client.from('activity').insert(body).single()

  if(taskError) throw createError({ statusCode: 500, message: 'Could not insert data' })
})
