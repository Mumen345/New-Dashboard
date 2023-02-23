<template>
  <div class="flex h-[8.3rem] items-center">
    <h1 class="m-4 block text-[1.8rem] font-bold text-brand-dark">
      {{ current.name }}
    </h1>
  </div>
</template>

<script setup>
import { routeDetails } from "@/stores/routeDetails.js";
const current = routeDetails();
</script>

<style lang="scss" scoped></style>
