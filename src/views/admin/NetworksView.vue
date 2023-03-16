<template>
   <main-layout>
      <div class="mb-4">
         <ActionComponent :showAction="isCheckedAll" :checkBoxIsClicked="checkedCheckbox" />

         <div class="mt-7 mb-8 overflow-x-auto rounded border bg-white px-0 sm:py-3 sm:px-3">
            <table class="table" id="table" width="100%">
               <thead class="thead-light">
                  <tr class="uppercase">
                     <th>
                        <input type="checkbox" @click="selectAll" />
                     </th>
                     <th>Name</th>
                     <th>RefCode</th>
                     <th>OwnerId</th>
                     <th>Status</th>
                     <th>Description</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="network in networksData" :key="network.id">
                     <td>
                        <input type="checkbox" class="checkbox" :checked="isCheckedAll" @click="updateCheckbox(network.id)" />
                     </td>
                     <td>{{ network.name }}</td>
                     <td>{{ network.refcode }}</td>
                     <td>{{ network.owner_id }}</td>
                     <td>
                        <span :class="useStatusStyle(network.status)" class="flex w-32 items-center justify-center rounded p-2 capitalize text-white">
                           {{ useStatusContent(network.status) }}</span>
                     </td>
                     <td>{{ network.description }}</td>
                     <td>
                        <div class="static">
                           <a type="button" class="text-lg font-bold text-neutral-400 hover:text-blue-500" data-dropdown-toggle="dropdown" data-popper-placement="bottom-end">
                              <i class="material-icons pointer-events-none">more_horiz</i>
                           </a>
                           <div class="z-10 hidden w-48 rounded bg-white py-5">
                              <a class="block w-full cursor-pointer px-5 py-2 text-base hover:bg-blue-100">View</a>
                              <a class="block w-full cursor-pointer px-5 py-2 text-base hover:bg-blue-100">
                                 Delete
                              </a>
                           </div>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </main-layout>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { routeDetails } from "@/stores/routeDetails";

import MainLayout from "@/layouts/MainLayout.vue";
import { getNetworks } from "@/apis/accountApi";
import { useStatusStyle } from "@/composables/useStatusStyle";
import { useStatusContent } from "@/composables/useStatusContent";
import ActionComponent from "@/components/reusables/ActionComponent.vue";
import { useSearchKeyword } from "@/stores/useSearchKeyword";
import { storeToRefs } from "pinia";

const store = useSearchKeyword();
const { search } = storeToRefs(store);

const isCheckedAll = ref(false);
const checkedCheckbox = ref(false);

const currentRoute = routeDetails();
currentRoute.name = "Networks";

const networks = ref([]);

// check ids
const selectedIds = ref([]);

const isSelected = (id) => {
   return selectedIds.value.includes(id);
};

const toggleSelection = (id) => {
   if (isSelected(id)) {
      // Remove the id from the array
      const index = selectedIds.value.indexOf(id);
      selectedIds.value.splice(index, 1);
   } else {
      // Add the id to the array
      selectedIds.value.push(id);
   }
};

function updateCheckbox(id) {
   // Toggle selection here
   toggleSelection(id);

   if (document.querySelector(".checkbox:checked")) {
      return (checkedCheckbox.value = true);
   }
   checkedCheckbox.value = false;
}

function selectAll() {
   isCheckedAll.value = !isCheckedAll.value
   if (selectedIds.value.length > 0) {
      selectedIds.value.splice(0, selectedIds.value.length);
   } else {
      selectedIds.value = networks.value.map(item => item.id);
   }

}

onMounted(async () => {
   const { data } = await getNetworks();

   if (data) networks.value = data.data;
});

const networksData = computed(() => {
   if (search.value.length > 0) {
      return networks.value.filter((item) =>
         Object.values(item).some(
            (value) =>
               typeof value === "string" &&
               value.toLowerCase().includes(search.value.toLowerCase())
         )
      );
   }
   return networks.value;
});

onUnmounted(() => {
   search.value = "";
});


</script>

