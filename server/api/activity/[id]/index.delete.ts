import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })
  if(event.context.params?.id === undefined) throw createError({ statusCode: 400, statusMessage: 'No activity id' })

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client.from('activity').delete().eq('id', event.context.params.id).single()
  if (error) throw createError(error.message)
  return data
})
