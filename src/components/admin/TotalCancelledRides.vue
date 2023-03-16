<template>
   <div class="flex h-full w-full flex-col justify-start rounded bg-white py-5 px-4 font-semibold">
      <div class="flex h-[5.4rem] w-[6.16rem] items-center justify-center rounded-2xl bg-red-100">
         <CancelIcon />
      </div>
      <h2 class="mb-2 mt-8 text-sm font-medium text-dark">
         Total Cancelled Rides
      </h2>
      <h2 class="text-2xl">
         <span>{{ cancelledRides }}</span> Rides
      </h2>
   </div>
</template>

<script setup>
import CancelIcon from "../icons/CancelIcon.vue";
defineProps({
   cancelledRides: {
      type: Number,
      default: 86,
   },
});
</script>

<style lang="scss" scoped></style>
