import { serverSupabaseUser, serverSupabaseServiceRole, serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { FamilyInvitationForm } from '~/types/family'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const redirectTo = `${runtimeConfig.public.DEPLOY_PRIME_URL}/create-password`
  const body: FamilyInvitationForm = await readBody(event)

  if (!body.invitedEmail) throw createError({ statusCode: 400, statusMessage: 'No email' })

  const user = await serverSupabaseUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unknown user' })

  const client = await serverSupabaseClient<Database>(event)
  const { data: dataFamily, error: errorFamily } = await client.from('family_member')
    .select('family')
    .eq('user', user.id)
    .maybeSingle()
  if (errorFamily) throw createError(errorFamily)

  const serviceClient = serverSupabaseServiceRole(event)
  const { error } = await serviceClient.auth.admin.inviteUserByEmail(body.invitedEmail, { data: { family: dataFamily?.family }, redirectTo })
  if (error) throw createError(error)
})
