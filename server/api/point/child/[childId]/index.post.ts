import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { Point } from '~/types/point.js'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ message: 'User not found', statusCode: 401 })

  const client = await serverSupabaseClient<Database>(event)
  const { data: tutor, error: tutorError } = await client.from('family_member').select('family, id').eq('user', user.id).maybeSingle()
  if (tutorError) throw createError(tutorError.message)
  if (!tutor) throw createError({ statusCode: 500, statusMessage: 'No member for this user' })

  if(event.context.params?.childId === undefined) throw createError({ statusCode: 500, statusMessage: 'No child id' })
  const { data: child, error: childError } = await client.from('family_member').select('id, family').eq('id', event.context.params.childId).maybeSingle()
  if (childError) throw createError(childError.message)
  if (!child) throw createError({ statusCode: 500, statusMessage: 'No member for this user' })

  const body: Point = await readBody(event)
  
  const { error: pointError } = await client.from('point').insert({ child: child.id, points: body.points, tutor:tutor.id, family: child.family }).single()

  if(pointError) throw createError({ message: 'Could not insert data', statusCode: 500 })
})
