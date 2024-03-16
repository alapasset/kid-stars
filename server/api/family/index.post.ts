import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { hash as argon2Hash } from 'argon2'
import type { Database } from '~/types/database.types'
import type { FamilyForm } from '~/types/family'


export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  const body: FamilyForm = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  const { data: family, error: errorFamily } = await client.from('family').insert({ creator: user.id, name: body.name }).select().single()
  if(errorFamily) throw createError(errorFamily)

  const hash = await argon2Hash(body.code)

  const { error: errorFamilyMember } = await client.from('family_member').insert({ code: hash, family: family.id, pseudo: body.pseudo, role: body.role, user: user.id })
  if(errorFamilyMember) throw createError(errorFamilyMember)
})
