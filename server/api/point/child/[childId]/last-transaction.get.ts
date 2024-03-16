import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ message: 'User not found', statusCode: 401 })

  if(event.context.params?.childId === undefined) throw createError({ statusCode: 400, statusMessage: 'No child id' })

  const client = await serverSupabaseClient<Database>(event)
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { data, error } = await client.from('point').select('points').eq('child', event.context.params.childId).order('created_at', { ascending: false }).limit(1)
  if (error) throw createError(error.message)
  if (data.length === 0) throw createError({ statusCode: 400, statusMessage: 'No point for this user' })

  return data
})
