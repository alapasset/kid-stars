import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if(!user) throw createError({statusCode: 401, statusMessage: `Unknown user`});

  const client = await serverSupabaseClient<Database>(event);
  const body = await readBody(event);
  if (!body.id) throw createError({statusCode: 400, statusMessage: `Missing id`});

  const { error: errorFamilyMember} = await client.from(`family_member`).select(`user`).eq(`id`, body.id).single();
  if(errorFamilyMember) throw createError(errorFamilyMember);

  const { error: errorFamilyMemberUpdate } = await client.from(`family_member`).update({ pseudo: body.pseudo, code: body.code }).eq(`id`, body.id);
  if(errorFamilyMemberUpdate) throw createError(errorFamilyMemberUpdate);
});
