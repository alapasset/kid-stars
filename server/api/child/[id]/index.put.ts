import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { ChildForm } from '~/types/member'

export default defineEventHandler(async (event) => {
  if(event.context.params?.id === undefined) throw createError({ statusCode: 500, statusMessage: 'No child id' })

  const client = await serverSupabaseClient<Database>(event)
  const body: ChildForm = await readBody(event)

  const { error: errorChildUpdate } = await client.from('family_member').update({ pseudo: body.pseudo }).eq('id', event.context.params.id)
  if(errorChildUpdate) throw createError(errorChildUpdate)
})
