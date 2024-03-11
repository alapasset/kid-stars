import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { FamilyMember } from '~/types/family'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  const client = await serverSupabaseClient<Database>(event)
  const body: Partial<FamilyMember> = await readBody(event)
  if (body.id === undefined) throw createError({ statusCode: 400, statusMessage: 'Missing id' })

  const dataBody: Partial<FamilyMember> = { pseudo: body.pseudo }
  if(body.code !== '') dataBody.code = body.code

  const { error: errorFamilyMemberUpdate } = await client.from('family_member').update(dataBody).eq('id', body.id)
  if(errorFamilyMemberUpdate) throw createError(errorFamilyMemberUpdate)
})
