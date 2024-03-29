import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })
  if(event.context.params?.childId === undefined) throw createError({ statusCode: 400, statusMessage: 'No child id' })

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client.from('point')
    .select(`
      *,
      activity:activity(*),
      child:child(*),
      task:task(*),
      tutor:tutor(*)
    `)
    .eq('child', event.context.params.childId)

  if (error) throw createError(error.message)
  if (data.length === 0) throw createError({ statusCode: 400, statusMessage: 'No point for this user' })
  return data
})
