<template>
   <div class="flex h-full w-full flex-col justify-start rounded bg-white py-5 px-4 font-semibold">
      <div class="flex h-[5.4rem] w-[6.16rem] items-center justify-center rounded-2xl bg-green-100">
         <RidesIcon />
      </div>
      <h2 class="mb-2 mt-8 text-sm font-medium text-dark">Total Ride Count</h2>
      <h2 class="text-2xl">
         <span>{{ totalRides }}</span> Rides
      </h2>
   </div>
</template>

<script setup>
import RidesIcon from "../icons/RidesIcon.vue";
defineProps({
   totalRides: {
      type: Number,
      default: 400,
   },
});
</script>

<style lang="scss" scoped></style>
