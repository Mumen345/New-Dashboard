<template>
  <div class="flex w-full">
    <div class="sticky top-0 h-screen w-1/5 bg-white">
      <SidebarComponent />
    </div>
    <div class="relative flex h-screen w-4/5 flex-col pl-[6.9rem]">
      <NavbarComponent />
      <RouteDetailsComponent v-if="currentRoute.showDetails" />
      <!-- <ActionComponent v-if="currentRoute.showDetails" /> -->
      <DashboardDetailsComponent v-if="!currentRoute.showDetails" />
      <div class="route relative mr-8 min-h-screen">
        <DropdownComponent />
        <RouterView />
      </div>
      <FooterComponent />
    </div>
  </div>
</template>

<script setup>
import { onUpdated } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
import { useRoute } from "vue-router";

import SidebarComponent from "@/components/reusables/SidebarComponent.vue";
import NavbarComponent from "@/components/reusables/NavbarComponent.vue";
import ActionComponent from "@/components/reusables/ActionComponent.vue";
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
</script>
<style lang="scss" scoped>
.route {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
