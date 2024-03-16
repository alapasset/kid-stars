import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ message: 'User not found', statusCode: 401 })
  if(event.context.params?.id === undefined) throw createError({ statusCode: 400, statusMessage: 'No family id' })

  const client = await serverSupabaseClient<Database>(event)
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { data, error } = await client.from('task').select('*, tutor(*), child(*), family(*)').eq('family', event.context.params.id).order('created_at', { ascending: true })
  if (error) throw createError(error.message)
  return data
})
