import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unknow user' })
  if (event.context.params?.familyId === undefined) throw createError({ statusCode: 400, statusMessage: 'No family id' })

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client
    .from('point')
    .select(`
      *,
      activity:activity(*),
      child:child(*),
      task:task(*),
      tutor:tutor(*)
    `)
    .eq('family', event.context.params.familyId)

  if (error) throw createError(error.message)
  if (data.length === 0) throw createError({ statusCode: 400, statusMessage: 'No point for this user' })
  return data
})
