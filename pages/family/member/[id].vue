<script setup lang="ts">

definePageMeta({
  middleware: `auth`
})

const route = useRoute();
const memberId = route.params.id as string

const { data: familyMember} = useFetchFamilyMember(memberId);

</script>

<template>
  <div
    v-if="familyMember"
    class="w-full flex justify-center"
  >
    <div v-if="familyMember?.code !== null">
      <FamilyMemberTutor :member="familyMember" />
    </div>
    <div v-else>
      <FamilyMemberChild :member="familyMember" />
    </div>
  </div>
</template>
