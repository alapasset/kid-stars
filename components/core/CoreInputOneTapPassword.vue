<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/naming-convention
import VOtpInput from 'vue3-otp-input'
const emit = defineEmits<{
  onComplete: [value: string]
}>()

const { t } = useI18n()

const otpInput = ref<InstanceType<typeof VOtpInput> | null>()

function onComplete (value: string) {
  emit('onComplete', value)
}

function onClearInput () {
  otpInput.value?.clearInput()
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-5">
      <v-otp-input
        ref="otpInput"
        input-classes="otp-input"
        input-type="password"
        :num-inputs="6"
        separator=""
        should-auto-focus
        should-focus-order
        value=""
        @on-complete="onComplete"
      />
    </div>
    <button class="btn btn-secondary" type="button" @click="onClearInput">{{ t('common.clear') }}</button>
  </div>
</template>

<style scoped>
  :deep(.otp-input) {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  /* Background colour of an input field with value */
  :deep(.otp-input.is-complete) {
    background-color: #e4e4e4;
  }
  :deep(.otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button) {
    -webkit-appearance: none;
    margin: 0;
  }
  :deep(input::placeholder) {
    font-size: 15px;
    text-align: center;
    font-weight: 600;
  }
</style>
