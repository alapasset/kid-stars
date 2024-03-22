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

  if (body.child === undefined || body.child === null || body.family === undefined || body.points === undefined || body.tutor === undefined) throw createError({ message: 'Missing data', statusCode: 500 })
  const { error: pointError } = await client.from('point').insert({ child: body.child, family: body.family , points: body.points, tutor:body.tutor, task: body.id }).single()
  if(pointError) throw createError({ message: 'Could not insert data', statusCode: 500 })
})
