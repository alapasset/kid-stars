<script setup lang="ts">
import type { FamilyMember } from '~/types/family'

const props = defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()

const user = useSupabaseUser()

const isTutor = computed(() => Boolean(props.member.code))
const profile = computed(() => props.member.user === user.value?.id ? String(user.value?.user_metadata.avatar_url) : undefined)
const title = computed(() => props.member.user === undefined ? t('family.tutor') : t('family.child'))
const canEdit = computed(() => props.member.user === user.value?.id || !isTutor.value)

</script>

<template>
  <div class="card h-80 w-56 border bg-base-100 shadow-xl">
    <FamilyMemberPoint
      v-if="!isTutor"
      :is-last-transaction="false"
      :member-id="member.id"
    />
    <figure>
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
    <div class="card-body justify-between px-4">
      <h2 class="card-title justify-center">
        {{ member.pseudo }}
      </h2>
      <div class="card-actions flex flex-col justify-end gap-5">
        <div>
          <div class="badge badge-outline">
            {{ title }}
          </div>
        </div>
        <div class="flex min-h-14 gap-5">
          <FamilyMemberPointForm
            v-if="!isTutor"
            :member
          />
          <FamilyMemberEdit
            v-if="canEdit"
            :member
          />
          <FamilyMemberDelete
            v-if="!isTutor"
            :member-id="member.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>
