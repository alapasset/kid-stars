import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { hash as argon2Hash } from 'argon2'
import type { Database } from '~/types/database.types'
import type { FamilyCreationForm } from '~/types/family'


export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  const body: FamilyCreationForm = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  const { data: family, error: errorFamily } = await client.from('family')
    .insert({ name: body.name, creator: user.id })
    .select()
    .single()
  if(errorFamily) throw createError(errorFamily)

  const hash = await argon2Hash(body.code)

  const { error: errorFamilyMember } = await client.from('family_member').insert({ pseudo: body.pseudo, family: family.id, user: user.id, code: hash, role: body.role })
  if(errorFamilyMember) throw createError(errorFamilyMember)

})
