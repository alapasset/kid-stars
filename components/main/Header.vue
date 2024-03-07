<script setup lang="ts">

const colorMode = useColorMode()

const setTheme = () => {
  colorMode.preference = isChecked.value ? `dark` : `light`
}

const isChecked = ref(colorMode.preference === `dark`)
</script>

<template>
  <header class="w-full flex justify-between border-b-2 border-gray-100 h-24 p-3 items-center">
    <NuxtLink to="/">
      <SvgoLogo class="text-7xl" />
    </NuxtLink>
    <div class="flex gap-5 items-center">
      <label class="flex cursor-pointer gap-2">
        <Icon
          class="w-5 h-5"
          name="material-symbols:sunny"
        />
        <input
          v-model="isChecked"
          type="checkbox"
          class="toggle"
          @change="setTheme"
        >
        <Icon
          class="w-5 h-5"
          name="material-symbols:mode-night"
        />
      </label>
      <MainAvatarMenu />
    </div>
  </header>
</template>
