<template>
  <div class="flex h-full flex-col items-stretch justify-between pt-10">
    <div class="bar_content">
      <ul class="flex w-full flex-col items-start justify-start">
        <li
          class="h-[7.5rem] w-full px-10 text-[1.5rem]"
          v-for="(nav, index) in sidebars"
          :key="index"
        >
          <router-link
            :to="nav.route"
            class="flex gap-x-4 fill-brand-dark font-normal"
          >
            <keep-alive>
              <component :is="nav.icon" class="fill-[#404040]"> </component>
            </keep-alive>
            <p>{{ nav.name }}</p></router-link
          >
        </li>
      </ul>
    </div>
    <div
      class="flex w-full items-center justify-start self-end justify-self-end"
    >
      <ButtonComponent
        text="Log Out"
        @click="logout"
        :component="LogoutIcon"
        customClass="block w-full h-24 rounded-none text-center text-[1.6rem] bg-brand text-white"
        customStyle=""
      />
    </div>
  </div>
</template>
<script setup>
import { markRaw, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { routeDetails } from "@/stores/routeDetails.js";
import { useAuthStore } from '@/stores/auth'

import ButtonComponent from "./ButtonComponent.vue";
import DashboardIcon from "../icons/DashboardIcon.vue";
import UsersIcon from "../icons/UsersIcon.vue";
import NetworksIcon from "../icons/NetworksIcon.vue";
import OrganizationIcon from "../icons/OrganizationIcon.vue";
import DriversIcon from "../icons/DriversIcon.vue";
import LogoutIcon from "../icons/LogoutIcon.vue";
import SidebarCarIcon from "../icons/SidebarCarIcon.vue";

const router = useRouter();
const route = useRoute();
const currentRoute = routeDetails();
const authStore = useAuthStore();

const sidebars = markRaw([
  { name: "Dashboard", route: "/admin/dashboard", icon: DashboardIcon },
  { name: "Users", route: "/admin/users", icon: UsersIcon },
  { name: "Networks", route: "/admin/networks", icon: NetworksIcon },
  {
    name: "Organizations",
    route: "/admin/organizations",
    icon: OrganizationIcon,
  },
  { name: "Drivers", route: "/admin/drivers", icon: DriversIcon },
  { name: "All Rides", route: "/admin/all-rides", icon: SidebarCarIcon },
]);
const logout = () => {
  localStorage.removeItem("auth-token");
  authStore.forceLogout();
};

onMounted(() => {
  if (route.path.includes("/admin/dashboard")) currentRoute.showDetails = false;
  else currentRoute.showDetails = true;
});
</script>
<style lang="scss" scoped>
.router-link-active {
  @apply font-bold text-brand;
  svg {
    @apply fill-brand;
  }
}

.bar_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 90vh !important;
  padding-top: 30px;
}
</style>
