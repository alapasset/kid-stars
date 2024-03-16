<script setup lang="ts">

const colorMode = useColorMode()
const isChecked = ref(colorMode.preference === 'dark')

function setTheme () {
  colorMode.preference = isChecked.value ? 'dark' : 'light'
}
</script>

<template>
  <header class="flex h-24 w-full items-center justify-between border-b-2 border-gray-100 p-3">
    <NuxtLink to="/">
      <SvgoLogo class="text-7xl" />
    </NuxtLink>
    <div class="flex items-center gap-5">
      <label class="flex cursor-pointer gap-2" for="themeInput">
        <Icon
          class="size-5"
          name="material-symbols:sunny"
        />
        <input
          v-model="isChecked"
          class="toggle"
          name="themeInput"
          type="checkbox"
          @change="setTheme"
        >
        <Icon
          class="size-5"
          name="material-symbols:mode-night"
        />
      </label>
      <MainAvatarMenu />
    </div>
  </header>
</template>
