import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if(!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  const body: { code: string } = await readBody(event)
  const client = await serverSupabaseClient<Database>(event)

  const { data: member, error: errorMember } = await client.from('family_member').select('code').eq('user', user.id).single()
  if(errorMember) throw createError(errorMember)
  if(member.code !== body.code) throw createError({ statusCode: 403, statusMessage: 'Wrong Password' })
})
