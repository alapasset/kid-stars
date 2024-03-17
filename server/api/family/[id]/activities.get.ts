import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'User not found' })
  if(event.context.params?.id === undefined) throw createError({ statusCode: 400, statusMessage: 'No family id' })

  const client = await serverSupabaseClient<Database>(event)
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { data, error } = await client.from('activity').select('*').eq('family', event.context.params.id).order('created_at', { ascending: true })
  if (error) throw createError(error.message)
  return data
})
