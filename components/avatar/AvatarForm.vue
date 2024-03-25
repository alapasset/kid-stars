<script lang="ts" setup>
const props = defineProps<{
  tutorId: string
}>()

const tutorId = toRef(props, 'tutorId')

const { t } = useI18n()

const { currentAvatar, currentStep, generatedOptions, currentOption, previousStep, nextStep, updateSelectedOptions } = useAvatar()

const { mutateAsync } = useUpdateFamilyMemberAvatar(tutorId)

async function saveAvatar () {
  await mutateAsync({ avatar: currentAvatar.value })
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <img alt="Avatar" class="mx-auto size-80" loading="lazy" :src="currentAvatar"/>
    <div v-if="currentStep <= generatedOptions.length - 1 ">
      <ul class="steps w-full">
        <li v-for="option in generatedOptions" :key="option.step"  class="step" :class="{'step-primary': currentStep >= option.step}">{{ t(`avatar.generator.${option.name}`) }}</li>
      </ul>
      <div class="flex flex-wrap">
        <figure v-for="avatar in currentOption?.avatars" :key="avatar.id" class="w-36 cursor-pointer" @click="() => updateSelectedOptions(avatar.values)">
          <img alt="Avatar" class="size-full object-cover" loading="lazy" :src="avatar.uri" />
        </figure>
      </div>
    </div>
    <div v-else>
      <p>{{ t('avatar.generator.finished') }}</p>
    </div>
    <div class="flex gap-2">
      <button
        class="btn btn-neutral basis-1/2"
        :disabled="currentStep < 1"
        type="button"
        @click="previousStep"
      >
        {{ t('avatar.generator.previous-step') }}
      </button>
      <button
        v-if="currentStep < generatedOptions.length"
        class="btn btn-primary basis-1/2"
        type="button"
        @click="nextStep"
      >
        {{ t('avatar.generator.next-step') }}
      </button>
      <button
        v-else
        class="btn btn-success basis-1/2"
        type="button"
        @click="saveAvatar"
      >
        {{ t('common.save') }}
      </button>
    </div>
  </div>
</template>
