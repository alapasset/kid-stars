import { serverSupabaseClient } from '#supabase/server'
import { hash as argon2Hash } from 'argon2'
import type { Database } from '~/types/database.types'
import type { TutorForm } from '~/types/member'

export default defineEventHandler(async (event) => {
  if(event.context.params?.id === undefined) throw createError({ statusCode: 500, statusMessage: 'No child id' })

  const client = await serverSupabaseClient<Database>(event)

  const body: TutorForm = await readBody(event)
  const { data, error: errorTutorPseudoUpdate } = await client.from('family_member').update({ pseudo: body.pseudo }).eq('id', event.context.params.id).select('id, pseudo, role').single()
  if(errorTutorPseudoUpdate) throw createError(errorTutorPseudoUpdate)

  if(body.code !== null && body.code !== undefined && body.code !== '') {
    const hash = await argon2Hash(body.code)
    const { error: errorTutorCodeUpdate } = await client.from('family_member').update({ code: hash }).eq('id', event.context.params.id)
    if(errorTutorCodeUpdate) throw createError(errorTutorCodeUpdate)
  }

  return data
})
