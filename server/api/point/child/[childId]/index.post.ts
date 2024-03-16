import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { PointForm } from '~/types/point'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ message: 'User not found', statusCode: 401 })

  const client = await serverSupabaseClient<Database>(event)
  const { data: tutor, error: tutorError } = await client.from('family_member').select('id').eq('user', user.id).maybeSingle()

  if (tutorError) throw createError(tutorError.message)
  if (!tutor) throw createError({ statusCode: 500, statusMessage: 'No member for this user' })

  if(event.context.params?.childId === undefined) throw createError({ statusCode: 500, statusMessage: 'No child id' })
  const { data: child, error: childError } = await client.from('family_member').select('id').eq('id', event.context.params.childId).maybeSingle()
  if (childError) throw createError(childError.message)
  if (!child) throw createError({ statusCode: 500, statusMessage: 'No member for this user' })

  const body: PointForm = await readBody(event)

  if(!(body.points && !Number.isNaN(body.points))) throw createError({ message: 'Invalid body', statusCode: 500 })

  const { error: pointError } = await client.from('point').insert({ child: child.id, points: body.points, tutor:tutor.id }).single()

  if(pointError) throw createError({ message: 'Could not insert data', statusCode: 500 })
})
