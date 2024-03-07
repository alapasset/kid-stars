<script setup lang="ts">
import type { FamilyMember } from '~/types/family';

const props = defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()

const isTutor = computed(() => !!props.member.code);
const profile = computed(() => props.member.user === user.value?.id ? user.value?.user_metadata.avatar_url : null);
const title = computed(() => props.member.user ? t(`family.tutor`) : t(`family.child`));
const canEdit = computed(() => props.member.user === user.value?.id || !isTutor.value);

const user = useSupabaseUser();
</script>

<template>
  <div
    v-if="props.member"
    class="card w-56 h-80 bg-base-100 shadow-xl border"
  >
    <figure>
      <div class="avatar p-2">
        <div class="w-24 mask mask-hexagon">
          <img
            v-if="profile"
            :src="profile"
          >
          <Icon
            v-else
            class="w-24 h-24"
            name="material-symbols:person"
          />
        </div>
      </div>
    </figure>
    <div class="card-body justify-between px-4">
      <h2 class="card-title justify-center">
        {{ props.member.pseudo }}
      </h2>
      <div class="card-actions flex flex-col justify-end gap-5">
        <div>
          <div class="badge badge-outline">
            {{ title }}
          </div>
        </div>
        <div class="flex min-h-14 gap-5">
          <FamilyMemberPoint
            v-if="!isTutor"
            :member="props.member"
          />
          <FamilyMemberEdit
            v-if="canEdit"
            :member="props.member"
          />
          <FamilyMemberDelete
            v-if="!isTutor"
            :member-id="props.member.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>
