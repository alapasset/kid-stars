import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  if(event.context.params?.id === undefined) throw createError({ statusCode: 400, statusMessage: 'No family id' })

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client.from('family').select('name, members:family_member(id, family, user, pseudo, role)').eq('id', event.context.params.id).maybeSingle()
  if (error) throw createError(error.message)
  if (!data) throw createError({ statusCode: 404, statusMessage: 'User not found' })

  return data
})
