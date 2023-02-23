<template>
  <div
    class="container flex h-full w-full flex-col justify-between rounded-lg bg-white"
  >
    <div class="flex items-center justify-start">
      <div
        class="rounded-1/2 my-[2.5rem] ml-[2.4rem] mr-[3rem] flex h-16 w-16 items-center justify-center rounded-full bg-brand"
      >
        <DashboardOrganisationIcon />
      </div>
      <div class="text-xl">
        <h2 class="m-2 mb-4 text-[1.4rem] font-medium">Organizations</h2>
        <h2 class="m-2 text-[1.8rem] font-bold">{{ organisationCount }}</h2>
      </div>
    </div>

    <div class="flex w-full my-[2.4rem] items-center justify-between text-xl underline">
      <h2 class="ml-[2.9rem]">Last updated</h2>
      <h2 class="mr-[2.9rem]">{{ lastUpdated }}</h2>
    </div>
  </div>
</template>

<script setup>
import DashboardOrganisationIcon from "../icons/DashboardOrganisationIcon.vue";
defineProps({
  organisationCount: {
     type: Number ||String,
    default: 428977,
  },
  lastUpdated: {
    type: String,
    default: "20/09/2022",
  },
});
</script>

<style lang="scss" scoped></style>
