import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({statusCode: 401, message: `User not found`})

  const body = await readBody(event)
  const {points, child} = body;
  if(!(points && child && !isNaN(Number(points)))) {
    throw createError({statusCode: 400, message: `Invalid body`})
  }
  const client = await serverSupabaseClient<Database>(event)

  const { data: tutor, error} = await client.from(`family_member`).select(`id`).eq(`user`, user.id).maybeSingle()
  if (error) throw createError(error.message)
  if (!tutor) throw createError({statusCode: 400, statusMessage: `No member for this user`})

  const {data: insertedPoint, error: pointError} = await client.from(`point`).insert({...body, tutor:tutor.id}).single()

  if(pointError) {
    console.error(pointError)
    throw createError({statusCode: 500, message: `Could not insert data`})
  }

  if(pointError) throw createError({statusCode: 500, message: `Could not insert data`})

  return insertedPoint
})
