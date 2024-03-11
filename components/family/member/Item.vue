<script setup lang="ts">
import type { FamilyMember } from '~/types/family'

const props = defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()

const user = useSupabaseUser()

const isTutor = computed(() => Boolean(props.member.code))
const profile = computed(() => props.member.user === user.value?.id ? String(user.value?.user_metadata.avatar_url) : undefined)
const title = computed(() => isTutor.value ? t('family.tutor') : t('family.child'))
</script>

<template>
  <div class="card flex h-64 w-56 flex-col border bg-base-100 shadow-xl ">
    <div class="flex items-center justify-between p-4">
      <div class="badge badge-outline">
        {{ title }}
      </div>
      <FamilyMemberPoint
        v-if="!isTutor"
        :is-last-transaction="false"
        :member-id="member.id"
      />
    </div>
    <h2 class="card-title justify-center p-5">
      {{ member.pseudo }}
    </h2>
    <figure class="flex-1">
      <div class="avatar p-2">
        <div class="mask mask-hexagon w-24">
          <img
            v-if="profile"
            alt="avatar"
            :src="profile"
          >
          <Icon
            v-else
            class="size-24"
            name="material-symbols:person"
          />
        </div>
      </div>
    </figure>
  </div>
</template>
