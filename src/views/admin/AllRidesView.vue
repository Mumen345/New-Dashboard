<template>
  <div class="container flex flex-col justify-start bg-white p-4">
    <div class="flex items-center justify-between p-4">
      <h2 class="mb-4 text-[1.7rem] font-bold">Account Information</h2>
    </div>

    <div class="w-full" v-for="(count, index) in NUMBER_OF_ROWS" :key="index">
      <div
        class="columns relative my-4 grid h-[11rem] grid-cols-4 items-center justify-between bg-brand-gray p-[1.2rem] text-xl font-semibold"
        v-for="(ride, index) in rideHistory"
        :key="index"
      >
        <!-- First Column  -->
        <div class="flex h-full flex-col items-start justify-around capitalize">
          <h2 class="capitalize text-sm">
            User ID :<span class="ml-4"> {{ ride.userID }}</span>
          </h2>
          <h2 class="capitalize text-sm">
            Role :<span class="ml-4"> {{ ride.role }}</span>
          </h2>
          <h2 class="capitalize text-sm">
            Cost :<span class="ml-4">{{ ride.cost }}</span>
          </h2>
        </div>

        <!-- Second Coumn -->
        <div class="flex h-full flex-col items-start justify-around capitalize">
          <h2 class="text-sm">
            Journey ID : <span class="ml-4"> {{ ride.journeryId }}</span>
          </h2>
          <h2 class="text-sm">
            Status : <span class="ml-4"> {{ ride.status }}</span>
          </h2>
          <h2 class="text-sm">
            Complete : <span class="ml-4"> {{ ride.complete }}</span>
          </h2>
        </div>

        <!-- Third  Column -->
        <div class="flex h-full flex-col items-start justify-around capitalize">
          <h2 class="table">
            <OriginIcon />
            <span class="ml-4 text-sm ">Origin : {{ ride.origin }}</span>
          </h2>
          <h2 class="ml-2"><VerticalLine /></h2>
          <h2 class="table">
            <DownLocationIcon />
            <span class="ml-4 text-sm">Destination : {{ ride.destination }}</span>
          </h2>
        </div>
        <!-- Last Column  -->
        <div class="flex h-full flex-col items-start justify-around capitalize">
          <h2 class="mb-4 table justify-start">
            <CarIcon /><span class="ml-4 text-sm block uppercase">{{
              ride.carModel
            }}</span>
          </h2>
          <h2 class="table">
            <TimeIcon />
            <span class="ml-4 block uppercase text-sm">{{ ride.start_time }}</span>
          </h2>
          <h2 class="ml-2"><VerticalLine /></h2>
          <h2 class="table">
            <TimeIcon />
            <span class="ml-4 block uppercase text-sm">{{ ride.end_time }}</span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";

import OriginIcon from "@/components/icons/OriginIcon.vue";
import DownLocationIcon from "@/components/icons/DownLocationIcon.vue";
import CarIcon from "@/components/icons/CarIcon.vue";
import TimeIcon from "@/components/icons/TimeIcon.vue";
import VerticalLine from "@/components/icons/VerticalLine.vue";

const currentRoute = routeDetails();
const NUMBER_OF_ROWS = 100;
const rideHistory = ref([
  {
    userID: "8989HHJG78",
    role: "Driver",
    cost: "40000",
    journeryId: "TTYH478",
    status: "verified",
    complete: false,
    origin: "Owerri",
    destination: "Lokoja",
    start_time: "4:00 PM",
    end_time: "4:00PM",
    carModel: "Volvo",
  },
]);
currentRoute.name = "All Rides"
</script>
<style lang="scss">
.columns {
  grid-template-columns: 2fr 2fr 3fr 1fr;
}
.table {
  @apply flex w-full items-center;
}
</style>
