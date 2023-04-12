<template>
   <main-layout>
      <div class="">
         <div class="grid grid-cols-2 gap-4 mb-5">
            <DashboardOrganisations :organisationCount="dashboard.organization" />
            <div class="grid grid-cols-2 gap-4">
               <div class="">
                  <DashboardUsers :usersCount="dashboard.users" />
               </div>

               <div>
                  <PublicNetwork :publicNetwork="dashboard.public_network" />
               </div>
               <div class="">
                  <PrivateNetwork :privateNetwork="dashboard.private_network" />
               </div>

               <div class="">
                  <DashboardDrivers :driversCount="dashboard.drivers" />
               </div>
            </div>
         </div>
         <LineChart :categories="categories" :series="series" :key="categories" />
      </div>
   </main-layout>
</template>

<script setup>
import LineChart from "@/components/admin/LineChart.vue";
import { ref, onMounted } from "vue";
import { routeDetails } from "@/stores/routeDetails";

import MainLayout from "@/layouts/MainLayout.vue";
import DashboardOrganisations from "@/components/admin/DashboardOrganisations.vue";
import DashboardUsers from "@/components/admin/DashboardUsers.vue";
import PublicNetwork from "@/components/admin/PublicNetwork.vue";
import PrivateNetwork from "@/components/admin/PrivateNetwork.vue";
import DashboardDrivers from "@/components/admin/DashboardDrivers.vue";
import { useQuery } from "@tanstack/vue-query";
import { dashboardQuery } from "@/apis/accountApi";
import axios from "axios";

const currentRoute = routeDetails();
const dashboard = ref({});
const categories = ref([]);
const series = ref([{
   name: "",
   data: [],
}])
currentRoute.name = "Dashboard";
const validateForDates = (value) => {
   const newDate = new Date(value);
   return newDate.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
   });
}

const { isLoading, isFetching, data } = useQuery({
   queryKey: ['dashboard'],
   queryFn: async () => await dashboardQuery(),
   onSuccess: (data) => {
      let result = data.data.data

      categories.value = result?.user_dates?.map((date) => validateForDates(date));

      series.value[0].data = result?.user_cumsum ?? []

      dashboard.value = {
         organization: result.organization,
         drivers: result.drivers,
         users: result.users,
         public_network: result.public_network,
         private_network: result.private_network
      };
   }
})
</script>
