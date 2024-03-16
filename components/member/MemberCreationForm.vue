<script setup lang="ts">
const props = defineProps<{
  familyId: string
}>()

const idFamily = toRef(props, 'familyId')

const { t } = useI18n()
</script>

<template>
  <div
    class="tabs tabs-lifted"
    role="tablist"
  >
    <input
      :aria-label="t(`family.child`)"
      checked
      class="tab font-bold"
      name="my_tabs_1"
      role="tab"
      type="radio"
    >
    <div
      class="tab-content rounded-box border-base-300 bg-base-100 p-6"
      role="tabpanel"
    >
      <ChildForm
        :family-id="idFamily"
      />
    </div>

    <input
      :aria-label="t(`family.tutor`)"
      class="tab font-bold"
      name="my_tabs_1"
      role="tab"
      type="radio"
    >
    <div
      class="tab-content rounded-box border-base-300 bg-base-100 p-6"
      role="tabpanel"
    >
      <TutorForm
        :family-id="idFamily"
      />
    </div>
  </div>
</template>
