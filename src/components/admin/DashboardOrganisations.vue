<template>
   <div class="card flex h-full w-full flex-col justify-between rounded-lg bg-white py-6 px-6">
      <div class="flex items-center justify-start mb-8">
         <div class="mr-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand">
            <DashboardOrganisationIcon />
         </div>
         <div class="text-xl">
            <h2 class="mb-1 text-lg font-medium">Organizations</h2>
            <h2 class="text-xl font-bold">{{ organisationCount }}</h2>
         </div>
      </div>

      <div class="flex w-full my-4 items-center text-base underline">
         <h2 class="mr-12">Last updated</h2>
         <h2 class="">{{ lastUpdated }}</h2>
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