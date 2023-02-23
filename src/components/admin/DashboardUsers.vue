<template>
  <div class="container h-[9.8rem] w-full rounded-lg bg-white">
    <div class="flex items-center justify-start">
      <div
        class="rounded-1/2 my-[2.5rem] ml-[5.2rem] mr-[8.21rem] flex h-16 w-16 items-center justify-center rounded-full bg-brand"
      >
        <DashboardUserIcon />
      </div>
      <div class="text-xl">
        <h2 class="m-2 mb-4 text-[1.4rem] font-medium">Users</h2>
        <h2 class="m-2 text-[1.8rem] font-bold">{{ usersCount }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardUserIcon from "../icons/DashboardUserIcon.vue";
defineProps({
  usersCount: {
     type: Number ||String,
    default: 74387,
  },
});
</script>

<style lang="scss" scoped></style>
