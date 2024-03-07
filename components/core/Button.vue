<script setup lang="ts">

const props = withDefaults(defineProps<{
  text: string,
  type: 'button' | 'submit' | 'reset',
  color: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error',
  state: 'normal' | 'ghost' | 'link' | 'outline' | 'active' | 'disabled' | 'glass' | 'no-animation',
  size: 'lg' | 'md' | 'sm' | 'xs' | 'wide',
  shape: 'normal' | 'block' | 'circle' | 'square',
  isPending: boolean,
  disabled: boolean,
}>(), {
  text: 'Submit',
  type: 'button',
  color: 'neutral',
  state: 'normal',
  size: 'md',
  shape: 'normal',
  isPending: false,
  disabled: false,
});

</script>

<template>
  <button
    :type="props.type"
    :class="[`btn`, `btn-${props.color}`, `btn-${props.state}`, `btn-${props.size}`, `btn-${props.shape}`]"
    :disabled="props.disabled"
  >
    <span
      v-if="props.isPending"
      class="loading loading-spinner"
    />
    {{ props.text }}
  </button>
</template>
