<template>
   <main-layout>
      <div class="flex flex-col justify-between gap-4">
         <div class="grid grid-cols-2 gap-x-2">
            <ProfileInfomation :firstname="org.name" :email="org.domain_name" :showPhone="false" />
            <div class="grid grid-rows-2 gap-y-4">
               <AccountDetails :firstname="org.name" :state="org.status" :lastname="org.domain_name" :gender="org.created_at" customClass="w-[70%]" />
               <ResidentialAddress customClass="w-[70%]" />
            </div>
         </div>

         <div style="grid-template-columns: 3fr 2fr" class="grid gap-4">
            <RideHistory />
            <div class="flex flex-col gap-4">
               <div class="grid grid-cols-2 gap-4">
                  <TotalRidesCount />
                  <TotalCancelledRides />
                  <TeamMembers />
                  <TotalRideDistance />
               </div>
               <PromotionsDetails />
            </div>
         </div>
         <div class="bg-white p-4">
            <h2 class="text-[1.7rem] m-8 font-bold">Employee Directory</h2>
            <TableGridComponent :headings="headings" :list="employees" route="" :gridRows="'grid-template-columns: 1fr 2fr 3fr 3fr 2fr 1fr'" />
         </div>
      </div>
   </main-layout>
</template>

<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import ProfileInfomation from "@/components/admin/ProfileInfomation.vue";
import AccountDetails from "@/components/admin/AccountDetails.vue";
import ResidentialAddress from "@/components/admin/ResidentialAddress.vue";
import RideHistory from "@/components/admin/RideHistory.vue";
import TotalRidesCount from "@/components/admin/TotalRidesCount.vue";
import TotalCancelledRides from "@/components/admin/TotalCancelledRides.vue";
import TeamMembers from "@/components/admin/TeamMembers.vue";
import TotalRideDistance from "@/components/admin/TotalRideDistance.vue";
import PromotionsDetails from "@/components/admin/PromotionsDetails.vue";
import TableGridComponent from "@/components/reusables/TableGridComponent.vue";

import axios from "axios";
import { filterTable } from "@/stores/search-filter";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const route = useRouter();
const orgId = route.currentRoute.value.params.id;
const org = ref([]);
const employees = ref([]);
const headings = ref(["name", "email", "location", "insurance", "..."]);

const filterTableStore = filterTable();

onMounted(async () => {
   const { data } = await axios.get(
      import.meta.env.VITE_API_URL + "/organization/" + orgId
   );
   if (data) org.value = data.data;
   // filterTableStore.allItems = org.value;
});
</script>

<style lang="scss" scoped></style>
