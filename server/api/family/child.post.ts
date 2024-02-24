import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({statusCode: 401, statusMessage: `Unknown user`})

  const body = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  const {data: familyMember, error: errorFamilyMember} = await client.from(`family_member`).select(`family`).eq(`user`, user.id).single()

  if(errorFamilyMember) throw createError(errorFamilyMember)

  const {error: errorFamilyMemberCreation} = await client.from(`family_member`)
    .insert({ pseudo: body.pseudo, family: familyMember?.family })

  if(errorFamilyMemberCreation) throw createError(errorFamilyMemberCreation)
})
