<script setup lang="ts">
const { t } = useI18n()

const addDialog = ref<HTMLDialogElement>()

function onClickAdd () {
  addDialog.value?.showModal()
}

function onCloseModal () {
  addDialog.value?.close()
}
</script>

<template>
  <li role="menuitem" @click="onClickAdd">{{ t('family.member.add.title') }}</li>

  <dialog
    ref="addDialog"
    class="modal"
  >
    <div class="modal-box flex flex-col gap-5">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
          {{ t('family.member.add.card.title') }}
        </h3>
        <form method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm" type="submit">
            <Icon
              class="size-5"
              name="material-symbols:close"
            />
          </button>
        </form>
      </div>
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
          <FamilyMemberChildForm @close-modal="onCloseModal" />
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
          <FamilyMemberTutorForm @close-modal="onCloseModal" />
        </div>
      </div>
    </div>
    <form
      class="modal-backdrop"
      method="dialog"
    >
      <button type="submit">close</button>
    </form>
  </dialog>
</template>
