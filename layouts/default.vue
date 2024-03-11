<template>
  <div class="flex min-h-screen flex-col">
    <MainHeader />
    <main class="flex-1 p-5">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>
