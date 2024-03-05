import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({statusCode: 401, statusMessage: `Unknown user`})
  if(!event.context.params?.id) throw createError({statusCode: 400, statusMessage: `No family id`})

  const body = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  const {error: errorFamilyMember} = await client.from(`family_member`)
    .insert({ pseudo: body.pseudo, family: event.context.params?.id, user: user.id, code: body.code})
  if(errorFamilyMember) throw createError(errorFamilyMember)
})