import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types.js'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  const client = await serverSupabaseClient<Database>(event)
  const body: Database['public']['Tables']['task']['Update'] = await readBody(event)
  const { child, id } = body
  if (id === undefined) throw createError({ statusCode: 400, statusMessage: 'Missing id' })
  if (child === undefined) {
    // eslint-disable-next-line unicorn/no-null
    body.child = null
    body.status = 'pending'
  }

  const { error } = await client.from('task').update(body).eq('id', id)
  if (error) throw createError(error)
})
