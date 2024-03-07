<script setup lang="ts">
import { BUTTON_SHAPE, BUTTON_STATE, BUTTON_TYPE } from '~/types/button';

const { t } = useI18n()

const addDialog = ref<HTMLDialogElement>()

const onClickCard = () => {
  addDialog.value?.showModal()
}

function onCloseModal() {
  addDialog.value?.close()
}
</script>

<template>
  <div
    class="card w-56 h-80 bg-base-100 shadow-xl cursor-pointer border"
    @click="onClickCard"
  >
    <figure>
      <div class="avatar p-2">
        <div
          class="w-24 mask mask-hexagon cursor-pointer"
          @click="onClickCard"
        >
          <Icon
            class="w-24 h-24"
            name="material-symbols:person-add-rounded"
          />
        </div>
      </div>
    </figure>
    <div class="card-body px-4">
      <h2 class="card-title text-center justify-center">
        {{ t('family.member.add.title') }}
      </h2>
    </div>
  </div>

  <dialog
    ref="addDialog"
    class="modal"
  >
    <div class="modal-box flex flex-col gap-5">
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-lg">
          {{ t('family.member.add.card.title') }}
        </h3>
        <form method="dialog">
          <CoreButton
            class="absolute right-2 top-2"
            :type="BUTTON_TYPE.button"
            :state="BUTTON_STATE.ghost"
            :shape="BUTTON_SHAPE.circle"
            @click="addDialog?.close()"
          >
            <Icon
              class="w-5 h-5"
              name="material-symbols:close"
            />
          </CoreButton>
        </form>
      </div>
      <div
        role="tablist"
        class="tabs tabs-lifted"
      >
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab font-bold"
          :aria-label="t(`family.child`)"
        >
        <div
          role="tabpanel"
          class="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <FamilyMemberChildForm @close-modal="onCloseModal" />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          class="tab font-bold"
          :aria-label="t(`family.tutor`)"
        >
        <div
          role="tabpanel"
          class="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <FamilyMemberTutorForm @close-modal="onCloseModal" />
        </div>
      </div>
    </div>
    <form
      method="dialog"
      class="modal-backdrop"
    >
      <button>close</button>
    </form>
  </dialog>
</template>
