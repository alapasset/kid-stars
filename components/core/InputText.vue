<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: string | number | undefined
  type?: InputTypeHTMLAttribute
  label?: string
  placeholder?: string
  errorMessages?: string
  required?: boolean
  icon?: string
  hint?: string
  disabled?: boolean
}>(), {
  type: `text`,
  label: ``,
  placeholder: ``,
  errorMessages: ``,
  required: false,
  icon: ``,
  hint: ``,
  disabled: false,
})

const emit = defineEmits([`update:modelValue`])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit(`update:modelValue`, target.value)
}

const isOnError = computed(() => !!props.errorMessages)

const currentType = ref(props.type)
const currentLabel = computed(() => `${props.label}${props.required ? ` *` : ``}`)
const hiddenIcon = computed(() => currentType.value === `password` ? `material-symbols:visibility` : `material-symbols:visibility-off`)

const updateType = () => {
  currentType.value = currentType.value === `password` ? `text` : `password`
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <span
      v-if="label"
      :class="{'input-error': isOnError}"
      class="text-sm font-medium capitalize"
    >
      {{ currentLabel }}
    </span>
    <label
      :class="{'input-error': isOnError}"
      class="input input-bordered flex items-center gap-2"
    >
      <Icon
        v-if="icon"
        class="w-6 h-6"
        :name="icon"
      />
      <input
        :value="modelValue"
        :type="currentType"
        class="grow"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        @input="onInput"
      >
      <Icon
        v-if="props.type === 'password'"
        class="w-6 h-6"
        :name="hiddenIcon"
        @click="updateType"
      />
    </label>
    <span
      v-if="hint"
      class="text-xs"
    >
      {{ hint }}
    </span>
    <span
      v-if="isOnError"
      class="text-red-500 text-xs"
    >
      {{ errorMessages }}
    </span>
  </div>
</template>
