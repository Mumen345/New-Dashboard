<template>
<div class="flex h-screen bg-gray-200 font-roboto">
   <div :class="sidebarOpen ? 'block' : 'hidden'" @click="sidebarOpen = false" class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>

   <div :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'" class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0">
      <SidebarComponent />
   </div>

   <div class="flex-1 flex flex-col overflow-hidden bg-[#F4F5FA]">
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
         <NavbarComponent />

         <div class="container-xl pt-4 pb-5">
            <RouteDetailsComponent v-if="currentRoute.showDetails" />
            <!-- <ActionComponent v-if="currentRoute.showDetails" /> -->
            <DashboardDetailsComponent v-if="!currentRoute.showDetails" />
            <div class="route relative min-h-screen">
               <DropdownComponent />
               <RouterView />
            </div>
            <FooterComponent />
         </div>
      </main>
   </div>
</div>
</template>

<script setup>
import { onUpdated, ref } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
import { useRoute } from "vue-router";

import SidebarComponent from "@/components/reusables/SidebarComponent.vue";
import NavbarComponent from "@/components/reusables/NavbarComponent.vue";
import DashboardDetailsComponent from "@/components/reusables/DashboardDetailsComponent.vue";
import RouteDetailsComponent from "@/components/reusables/RouteDetailsComponent.vue";
import FooterComponent from "@/components/reusables/FooterComponent.vue";
import DropdownComponent from "@/components/reusables/DropdownComponent.vue";

const currentRoute = routeDetails();
const route = useRoute();
onUpdated(() => {
  if (route.path.includes("dashboard")) currentRoute.showDetails = false;
  else currentRoute.showDetails = true;
});

const sidebarOpen = ref(false)
</script>
<style lang="scss" scoped>
.route {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
