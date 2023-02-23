<template>
  <div
    class="container flex h-fit w-full flex-col justify-start rounded bg-white p-3 font-semibold"
  >
    <div
      class="flex h-[5.4rem] w-[6.16rem] items-center justify-center rounded-2xl bg-green-100"
    >
      <RidesIcon />
    </div>
    <h2 class="my-8 text-[1.4rem] font-medium text-dark">Total Ride Count</h2>
    <h2 class="text-[1.4rem]">
      <span class="text-[2.6rem]">{{ totalRides }}</span> Rides
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
