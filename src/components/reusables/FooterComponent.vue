<template>
  <div
    class="mt-4 flex items-center justify-between  justify-self-end bg-white p-6 text-base font-normal"
  >
    <div class="flex gap-x-4">
      <h2>Greach</h2>
      <h2>|</h2>
      <h2>{{ currentYear() }}</h2>
    </div>
    <div class="flex gap-x-12">
      <h2 class="">Terms of Use</h2>
      <h2 class="">Privacy Policy</h2>
    </div>
  </div>
</template>

<script setup>
const currentYear = () => new Date().getFullYear();
</script>

<style lang="scss" scoped></style>
