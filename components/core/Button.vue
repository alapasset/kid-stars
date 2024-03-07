<script setup lang="ts">
import { BUTTON_COLOR, BUTTON_SHAPE, BUTTON_SIZE, BUTTON_STATE, BUTTON_TYPE } from '~/types/button';
import type { ButtonColor,  ButtonShape,  ButtonSize,  ButtonState, ButtonType} from '~/types/button';

const props = withDefaults(defineProps<{
  type?: ButtonType,
  color?: ButtonColor,
  state?: ButtonState,
  size?: ButtonSize,
  shape?: ButtonShape,
  isPending?: boolean,
  disabled?: boolean,
}>(), {
  type: BUTTON_TYPE.button,
  color: BUTTON_COLOR.neutral,
  state: BUTTON_STATE.normal,
  size: BUTTON_SIZE.md,
  shape: BUTTON_SHAPE.normal,
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

    <slot />
  </button>
</template>
