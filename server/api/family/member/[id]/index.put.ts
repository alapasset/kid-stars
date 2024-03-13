import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { hash as argon2Hash } from 'argon2'
import type { Database } from '~/types/database.types'
import type { FamilyMember } from '~/types/family'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  const client = await serverSupabaseClient<Database>(event)
  const body: FamilyMember = await readBody(event)

  const dataBody: Partial<FamilyMember> = { pseudo: body.pseudo }
  if(body.code !== null && body.code !== undefined && body.code !== '') {
    const hash = await argon2Hash(body.code)
    dataBody.code = hash
  }

  const { error: errorFamilyMemberUpdate } = await client.from('family_member').update(dataBody).eq('id', body.id)
  if(errorFamilyMemberUpdate) throw createError(errorFamilyMemberUpdate)
})
