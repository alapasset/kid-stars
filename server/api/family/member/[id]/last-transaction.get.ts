import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({statusCode: 401, message: `User not found`})
  if(!event.context.params?.id) throw createError({statusCode: 400, statusMessage: `No child id`})
  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client.from(`point`).select(`points`).eq(`child`, event.context.params?.id).order(`created_at`, {ascending: false}).limit(1)
  if (error) throw createError(error.message)
  if (!data || data.length === 0) throw createError({statusCode: 400, statusMessage: `No point for this user`})
  return data
})
