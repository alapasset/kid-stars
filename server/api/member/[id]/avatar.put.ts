import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { FamilyMember } from '~/types/member'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  if(event.context.params?.id === undefined) throw createError({ statusCode: 400, statusMessage: 'No member id' })

  const body: Partial<FamilyMember> = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)
  const { error } = await client.from('family_member').update({ avatar: body.avatar }).eq('id', event.context.params.id)
  if (error) throw createError(error.message)
})
