import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })
  if(event.context.params?.id === undefined) throw createError({ statusCode: 500, statusMessage: 'No tutor id' })

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client.from('family_member').select('id, family, user, pseudo, role').eq('id', event.context.params.id).maybeSingle()

  if (error) throw createError(error.message)
  if (!data) throw createError({ statusCode: 500, statusMessage: 'No tutor found' })
  return data
})
