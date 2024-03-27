import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  const client = await serverSupabaseClient<Database>(event)
  const { data: familyId, error } = await client.from('family_member').select('id:family').eq('user', user.id).maybeSingle()

  if (error) throw createError(error.message)
  if (familyId === null) throw createError('message')

  const { data: familyMembers, error: errorFamilyMember } = await client.from('family_member').select('id, avatar, pseudo, role, user, family').eq('family', familyId.id)
  if (errorFamilyMember) throw  createError(errorFamilyMember.message)
  return familyMembers
})
