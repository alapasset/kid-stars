
import type { NuxtLink } from '#build/components';

<template>
  <header class="w-full flex justify-between border-b-2 border-gray-100 h-24 p-3 items-center">
    <NuxtLink to="/">
      <img
        src="/logo.png"
        alt="Logo"
        class="h-20"
      >
    </NuxtLink>
    <MainAvatarMenu />
  </header>
</template>
