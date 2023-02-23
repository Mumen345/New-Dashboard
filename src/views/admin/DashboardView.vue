<template>
  <div class="">
    <div
      class="relative mx-auto my-4 grid h-1/2 w-full gap-4"
      style="grid-template-columns: 1fr 2fr"
    >
      <DashboardOrganisations :organisationCount="dashboard.organization"/>
      <div class="grid grid-cols-2 gap-4">
        <DashboardUsers :usersCount="dashboard.users" />
        <PublicNetwork :publicNetwork="dashboard.public_network" />
        <PrivateNetwork :privateNetwork="dashboard.private_network" />
        <DashboardDrivers :driversCount="dashboard.drivers" />
      </div>
    </div>
    <LineChart :categories="categories" :series="series" />
  </div>
</template>

<script setup>
import LineChart from "@/components/admin/LineChart.vue";
import { ref, onMounted } from "vue";

import { routeDetails } from "@/stores/routeDetails";
import DashboardOrganisations from "@/components/admin/DashboardOrganisations.vue";
import DashboardUsers from "@/components/admin/DashboardUsers.vue";
import PublicNetwork from "@/components/admin/PublicNetwork.vue";
import PrivateNetwork from "@/components/admin/PrivateNetwork.vue";
import DashboardDrivers from "@/components/admin/DashboardDrivers.vue";
import axios from "axios";

const currentRoute = routeDetails();
const dashboard = ref({});
const dates = ref([
  "2023-03-04",
  "2023-03-05",
  "2023-03-11",
  "2023-03-23",
  "2023-03-2",
  "2023-03-10",
  "2023-10-04",
  "2023-11-04",
]);
const validateForDates = (value) => {
  const newDate = new Date(value);
  return newDate.toLocaleDateString("default", {
    month: "short",
    day: "numeric",
  });
};
const categories = dates.value.map((date) => validateForDates(date));
const series = ref([
  {
    name: "",
    data: [100, 500, 1000, 1200, 1800, 2000, 2500, 3000],
  },
]);

const getDashboard = async () => {
  await axios.get(import.meta.env.VITE_API_URL + "/dashboard", {
    headers: { 
      Authorization: "Bearer " + localStorage.getItem ("auth-token")
    }
  }).then((response) => {
    var data = response.data.data;
    dashboard.value = {
      organization : data.organization,
      drivers : data.drivers,
      users : data.users,
      public_network : data.public_network,
      private_network : data.private_network
    };
  }).catch((error) => {
  });
};

onMounted(() => {
  currentRoute.name = "Dashboard";
  getDashboard();
});
</script>

<style lang="scss" scoped></style>
