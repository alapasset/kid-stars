import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types.js'
import type { Activity } from '~/types/activity'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })
  if(event.context.params?.id === undefined) throw createError({ statusCode: 500, statusMessage: 'No activity id' })

  const client = await serverSupabaseClient<Database>(event)
  const body: Partial<Activity> = await readBody(event)

  const { error } = await client.from('activity').update(body).eq('id', event.context.params.id)
  if (error) throw createError(error)
})
