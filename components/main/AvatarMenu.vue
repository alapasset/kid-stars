
<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { t } = useI18n()

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {throw createError(error)}
  navigateTo(`/login`)
}

</script>

<template>
  <div>
    <div
      v-if="user"
      class="flex flex-row gap-3"
    >
      <VAvatar
        size="40"
        :image="user.user_metadata.avatar_url"
      />
      <VMenu>
        <template #activator="{ props }">
          <VBtn
            icon="mdi-dots-vertical"
            v-bind="props"
          />
        </template>
        <VList>
          <VListItem
            :title="t('family.manage')"
            @click="navigateTo(`/family`)"
          />
          <VListItem
            :title="t('common.logout')"
            @click="signOut"
          />
        </VList>
      </VMenu>
    </div>
    <VBtn
      v-else
      to="/login"
    >
      {{ t('common.login') }}
    </VBtn>
  </div>
</template>
