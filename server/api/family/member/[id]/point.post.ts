import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { Point } from '~/types/point'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, message: 'User not found' })

  const body: Point = await readBody(event)
  const { points, child } = body
  if(!(points && child && !Number.isNaN(Number(points)))) throw createError({ statusCode: 400, message: 'Invalid body' })

  const client = await serverSupabaseClient<Database>(event)

  const { data: tutor, error } = await client.from('family_member').select('id').eq('user', user.id).maybeSingle()
  if (error) throw createError(error.message)
  if (!tutor) throw createError({ statusCode: 400, statusMessage: 'No member for this user' })

  const { error: pointError } = await client.from('point').insert({ ...body, tutor:tutor.id }).single()

  if(pointError) throw createError({ statusCode: 500, message: 'Could not insert data' })
})
