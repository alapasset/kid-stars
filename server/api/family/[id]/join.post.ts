import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { hash as argon2Hash } from 'argon2'
import type { Database } from '~/types/database.types'
import type { FamilyForm } from '~/types/family'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })
  if(event.context.params?.id === undefined) throw createError({ statusCode: 400, statusMessage: 'No family id' })

  const requestBody: FamilyForm = await readBody(event)

  const client = await serverSupabaseClient<Database>(event)

  const hash = await argon2Hash(requestBody.code)

  const { error: errorFamilyMember } = await client.from('family_member').insert({ code: hash, family: event.context.params.id, pseudo: requestBody.pseudo, role: requestBody.role, user: user.id })
  if(errorFamilyMember) throw createError(errorFamilyMember)
})
