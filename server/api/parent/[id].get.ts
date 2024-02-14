import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  if(!event.context.params?.id) throw createError(`Unknown parent`)

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client.from(`parents`).select().eq(`id`, event.context.params.id)

  if (error) throw createError({ statusMessage: error.message })

  return data
})
