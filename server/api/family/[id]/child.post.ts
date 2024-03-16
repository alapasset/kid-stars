import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { ChildForm } from '~/types/member'

export default defineEventHandler(async (event) => {
  if(event.context.params?.id === undefined) throw createError({ statusCode: 500, statusMessage: 'No family id' })

  const body:ChildForm = await readBody(event)

  const client = await serverSupabaseClient<Database>(event)
  const { error: errorFamilyMemberCreation } = await client.from('family_member').insert({ family: event.context.params.id, pseudo: body.pseudo, role: 'child' })

  if(errorFamilyMemberCreation) throw createError(errorFamilyMemberCreation)
})
