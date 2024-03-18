import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types.js'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })
  if(event.context.params?.id === undefined) throw createError({ statusCode: 500, statusMessage: 'No task id' })


  const client = await serverSupabaseClient<Database>(event)
  const body: Database['public']['Tables']['task']['Update'] = await readBody(event)
  body.status = 'validated'

  const { error } = await client.from('task').update(body).eq('id', event.context.params.id)
  if (error) throw createError(error)
})
