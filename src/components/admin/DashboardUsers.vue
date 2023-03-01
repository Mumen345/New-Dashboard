<template>
   <div class="card rounded-lg bg-white py-5 px-4">
      <div class="flex items-center justify-start">
         <div class="flex h-12 w-12 mr-4 flex-shrink-0 items-center justify-center rounded-full bg-brand">
            <DashboardUserIcon />
         </div>
         <div class="text-xl">
            <h2 class="text-lg font-medium">Users</h2>
            <h2 class="text-base font-bold">{{ usersCount }}</h2>
         </div>
      </div>
   </div>
</template>

<script setup>
import DashboardUserIcon from "../icons/DashboardUserIcon.vue";
defineProps({
   usersCount: {
      type: Number || String,
      default: 74387,
   },
});
</script>

<style lang="scss" scoped></style>
