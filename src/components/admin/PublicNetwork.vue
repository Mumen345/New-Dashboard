<template>
  <div class="container h-[9.8rem] w-full rounded-lg bg-white shadow">
    <div class="flex items-center justify-start">
      <div
        class="rounded-1/2 my-[2.5rem] ml-[5.2rem] mr-[8.21rem] flex h-16 w-16 items-center justify-center rounded-full bg-brand"
      >
        <PublicNetworkIcon />
      </div>
      <div class="text-xl">
        <h2 class="m-2 mb-4 text-[1.4rem] font-medium">Public Network</h2>
        <h2 class="m-2 text-[1.8rem] font-bold">{{ publicNetwork }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import PublicNetworkIcon from '../icons/PublicNetworkIcon.vue';
defineProps({
    publicNetwork: {
        type: Number ||String,
        default: 747,
    }
});
</script>

<style lang="scss" scoped></style>
