<template>
   <div class="card w-full rounded-lg bg-white shadow py-5 px-4">
      <div class="flex items-center justify-start">
         <div class="flex h-12 w-12 mr-4 flex-shrink-0 items-center justify-center rounded-full bg-brand">
            <PublicNetworkIcon />
         </div>
         <div class="text-xl">
            <h2 class="text-lg font-medium">Public Network</h2>
            <h2 class="text-base font-bold">{{ publicNetwork }}</h2>
         </div>
      </div>
   </div>
</template>

<script setup>
import PublicNetworkIcon from '../icons/PublicNetworkIcon.vue';
defineProps({
   publicNetwork: {
      type: Number || String,
      default: 747,
   }
});
</script>

<style lang="scss" scoped></style>
