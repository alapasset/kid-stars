<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'
const model = defineModel({ type: String })

const props = withDefaults(defineProps<{
  disabled?: boolean
  errorMessages?: string
  hint?: string
  icon?: string
  label?: string
  placeholder?: string
  required?: boolean
  type?: InputTypeHTMLAttribute
}>(), {
  type: 'text',
  label: '',
  placeholder: '',
  errorMessages: '',
  icon: '',
  hint: '',
})

const { type } = toRefs(props)

const currentType = ref(type.value)

const isOnError = computed(() => Boolean(props.errorMessages))
const currentLabel = computed(() => `${props.label}${props.required ? ' *' : ''}`)
const hiddenIcon = computed(() => currentType.value === 'password' ? 'material-symbols:visibility' : 'material-symbols:visibility-off')
const inputName = computed(() => `${props.label.toLowerCase().replace(/ /gu, '_')}_input`)

function updateType () {
  currentType.value = currentType.value === 'password' ? 'text' : 'password'
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <span
      v-if="label"
      class="text-sm font-medium capitalize"
      :class="{'input-error': isOnError}"
    >
      {{ currentLabel }}
    </span>
    <label
      class="input input-bordered flex items-center gap-2"
      :class="{'input-error': isOnError}"
      :for="inputName"
    >
      <Icon
        v-if="icon"
        class="size-6"
        :name="icon"
      />
      <input
        v-model="model"
        class="grow"
        :disabled
        :name="inputName"
        :placeholder
        :required
        :type="currentType"
      >
      <Icon
        v-if="props.type === 'password'"
        class="size-6"
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
      class="text-xs text-red-500"
    >
      {{ errorMessages }}
    </span>
  </div>
</template>
