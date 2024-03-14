<script setup lang="ts">
import type { FamilyMember } from '~/types/family'

const props = defineProps<{ familyId: string }>()
const { t } = useI18n()
const familyId = toRef(props, 'familyId')
const { data: familyMembers, isFetched } = useFetchFamilyMembers(familyId)

function isTutor (member: FamilyMember) {
  return member.role === 'tutor'
}

function getStatus (member: FamilyMember) {
  return isTutor(member) ? t('common.tutor') : t('common.child')
}
</script>

<template>
  <div v-if="isFetched">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>{{ t('common.name') }}</th>
          <th class="hidden md:table-cell">{{ t('common.status') }}</th>
          <th>{{ t('common.points') }}</th>
          <th>{{ t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="member in familyMembers"
          :key="member?.id"
        >
          <td class="flex flex-col justify-center gap-2">
            <span>{{ member.pseudo }}</span>
            <div class="badge badge-outline md:hidden">{{ getStatus(member) }}</div>
          </td>
          <td class="hidden md:table-cell">
            <div class="badge badge-outline">{{ getStatus(member) }}</div>
          </td>
          <td>
            <FamilyMemberPoint
              v-if="!isTutor(member)"
              :is-last-transaction="false"
              :member-id="member.id"
            />
          </td>
          <td class="flex gap-3">
            <FamilyMemberPointForm
              v-if="!isTutor(member)"
              :member
            />
            <FamilyMemberChildEdit
              v-if="!isTutor(member)"
              :member
            />
            <FamilyMemberDelete
              v-if="!isTutor(member)"
              :member-id="member.id"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-center">
    <span class="loading loading-dots loading-lg" />
  </div>
</template>
