<template>
   <main-layout>
      <div class="container flex flex-col justify-start bg-white p-4">
         <div class="flex items-center justify-between p-4">
            <h2 class="mb-4 text-[1.7rem] font-bold">Account Information</h2>
         </div>

         <div class="w-full" v-for="(journey, index) in journeys" :key="index">
            <div class="grid grid-cols-10 gap-x-7 bg-brand-gray my-4 p-7 text-xl font-semibold" v-for="(ride, key) in journey" :key="key">
               <!-- First Column  -->
               <div class="col-span-2 flex h-full flex-col gap-y-3 capitalize">
                  <div class="flex items-center text-sm">
                     <span class="whitespace-nowrap">User ID :</span>
                     <span class="ml-4"> {{ ride.user_id }}</span>
                  </div>
                  <div class="flex items-center text-sm">
                     <span class="whitespace-nowrap">Role :</span>
                     <span class="ml-4"> {{ ride.role }}</span>
                  </div>
                  <div class="flex items-center text-sm">
                     <span class="whitespace-nowrap">Cost :</span>
                     <span class="ml-4">{{ ride.cost ?? '*****' }}</span>
                  </div>
               </div>

               <!-- Second Coumn -->
               <div class="col-span-4 flex h-full flex-col gap-y-3 capitalize">
                  <div class="flex items-center text-sm">
                     <span class="whitespace-nowrap">Journey ID:</span>
                     <span class="ml-4 mr-3 truncate uppercase" :title="ride?.journey_id?.toUpperCase()"> {{ ride?.journey_id }}</span>
                  </div>
                  <div class="flex items-center text-sm">
                     <span class="whitespace-nowrap">Status:</span>
                     <span class="ml-4"> {{ ride.status }}</span>
                  </div>
                  <div class="flex items-center text-sm">
                     <span class="whitespace-nowrap">Complete:</span>
                     <span class="ml-4"> {{ ride.complete ?? '*****' }}</span>
                  </div>
               </div>

               <div class="col-span-4 flex gap-x-3">
                  <div class="grow flex flex-col items-start justify-around capitalize">
                     <div class="flex items-center text-sm gap-x-4">
                        <OriginIcon />
                        <span>Origin: {{ ride.origin ?? '*****' }}</span>
                     </div>
                     <h2 class="ml-1.5">
                        <VerticalLine />
                     </h2>
                     <div class="flex items-center text-sm gap-x-4">
                        <DownLocationIcon />
                        <span>Destination : {{ ride.destination ?? '*****' }}</span>
                     </div>
                  </div>

                  <div class="flex flex-col items-start justify-around capitalize">
                     <h2 class="mb-4 flex w-full items-center justify-start">
                        <CarIcon />
                        <span class="ml-4 text-sm block uppercase">{{ ride.carModel ?? '*****' }}</span>
                     </h2>
                     <h2 class="flex w-full items-center">
                        <TimeIcon />
                        <span class="ml-4 block uppercase text-sm">{{ ride.start_time ?? '*****' }}</span>
                     </h2>
                     <h2 class="ml-2">
                        <VerticalLine />
                     </h2>
                     <h2 class="flex w-full items-center">
                        <TimeIcon />
                        <span class="ml-4 block uppercase text-sm">{{ ride.end_time ?? '*****' }}</span>
                     </h2>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </main-layout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";

import MainLayout from "@/layouts/MainLayout.vue";
import OriginIcon from "@/components/icons/OriginIcon.vue";
import DownLocationIcon from "@/components/icons/DownLocationIcon.vue";
import CarIcon from "@/components/icons/CarIcon.vue";
import TimeIcon from "@/components/icons/TimeIcon.vue";
import VerticalLine from "@/components/icons/VerticalLine.vue";
import { useQuery } from "@tanstack/vue-query";
import { journeysQuery } from "@/apis/accountApi";

const currentRoute = routeDetails();
currentRoute.name = "All Rides"
const journeys = ref([])

const { isLoading, isError } = useQuery({
   queryKey: ['journeys'],
   queryFn: async () => await journeysQuery(),
   onSuccess: (data) => journeys.value = data.data.data
})
</script>

