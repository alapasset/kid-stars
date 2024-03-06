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
</script>

<template>
  <div class="flex flex-col gap-2">
    <span
      v-if="label"
      :class="{'input-error': isOnError}"
      class="text-sm font-medium capitalize "
    >
      {{ label }}
    </span>
    <label
      :class="{'input-error': isOnError}"
      class="input input-bordered flex items-center gap-2"
    >
      <Icon
        v-if="icon"
        :name="icon"
      />
      <input
        :value="modelValue"
        :type="type"
        class="grow"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        @input="onInput"
      >
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
