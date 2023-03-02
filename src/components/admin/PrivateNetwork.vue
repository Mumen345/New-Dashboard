<template>
   <div class="card w-full rounded-lg bg-white shadow py-5 px-4">
      <div class="flex items-center justify-start">
         <div class="flex h-12 w-12 mr-4 flex-shrink-0 items-center justify-center rounded-full bg-brand">
            <PrivateNetworkIcon />
         </div>
         <div class="text-xl">
            <h2 class="text-lg font-medium">Private Network</h2>
            <h2 class="text-base font-bold">{{ privateNetwork }}</h2>
         </div>
      </div>
   </div>
</template>

<script setup>
import PrivateNetworkIcon from "../icons/PrivateNetworkIcon.vue";
defineProps({
   privateNetwork: {
      type: Number || String,
      default: 747,
   },
});
</script>

<style lang="scss" scoped></style>
