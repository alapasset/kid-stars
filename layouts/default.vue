<template>
  <div class="flex flex-col min-h-screen">
    <MainHeader />
    <main class="flex-1 p-5">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>
