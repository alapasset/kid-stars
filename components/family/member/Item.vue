<script setup lang="ts">
import type { FamilyMember } from '~/types/family';

const props = defineProps<{
  member: FamilyMember
}>()

const { t } = useI18n()

const isTutor = computed(() => !!props.member.code);
const profile = computed(() => props.member.user === user.value?.id ? user.value?.user_metadata.avatar_url : null);
const title = computed(() => props.member.user ? t(`family.tutor`) : t(`family.child`));
const isGoodCode = computed(() => code.value === props.member.code);
const canEdit = computed(() => props.member.user === user.value?.id || !isTutor.value);

const codeDialog = ref<HTMLDialogElement>()
const user = useSupabaseUser();

const { handleSubmit } = useForm();

const { value: code, errorMessage: errorMessageCode, setErrors } = useField<string>(
  `code`,
  inputValue => {
    if(inputValue?.length < 4) return t(`form.error.code.required`);
    return true;
  }
);

const onSubmit = handleSubmit(() => {
  if (!isGoodCode.value) {
    setErrors(t(`form.error.code.wrong`));
    return;
  }
  navigateTo(`/family/member/${props.member.id}`)
});

const onClickCard = () => {
  if(isTutor.value) {
    codeDialog.value?.showModal();
    return
  }
  navigateTo(`/family/member/${props.member.id}`);
}
</script>

<template>
  <div
    v-if="props.member"
    class="card w-56 h-80 bg-base-100 shadow-xl border"
  >
    <figure>
      <div class="avatar p-2">
        <div
          class="w-24 mask mask-hexagon cursor-pointer"
          @click="onClickCard"
        >
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

  <dialog
    ref="codeDialog"
    class="modal"
  >
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <Icon
            class="w-5 h-5"
            name="material-symbols:close"
          />
        </button>
      </form>
      <h3 class="font-bold text-lg">
        {{ t('family.member.item.title') }}
      </h3>
      <div class="flex flex-col gap-3 mt-3">
        <CoreInputText
          v-model="code"
          :placeholder="t('form.label.code')"
          type="number"
          :error-messages="errorMessageCode"
          icon="material-symbols:lock"
        />
        <CoreButton
          :type="`submit`"
          :color="`primary`"
          :shape="`block`"
          :text="t('common.confirm')"
          @click="onSubmit"
        />
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
