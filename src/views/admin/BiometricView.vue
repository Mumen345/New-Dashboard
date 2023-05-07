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
                     <th>documents</th>
                     <th>DL</th>
                     <th>Verified</th>
                     <th>SmileID Data</th>
                     <th>Date</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="biometric in biometricData" :key="biometric.id">
                     <td>
                        <input type="checkbox" class="checkbox" :checked="isCheckedAll" @click="updateCheckbox(biometric.id)" />
                     </td>
                     <td>{{ biometric.name }}</td>
                     <td>{{ biometric.documents }}</td>
                     <td>{{ biometric.driver_license_verified }}</td>
                     <td>
                        <span :class="useStatusStyle(biometric.verified)" class="flex w-32 items-center justify-center rounded p-2 capitalize text-white">
                           {{ useStatusContent(biometric.verified) }}</span>
                     </td>
                     <td>{{ biometric.smile_response }}</td>
                     <td>{{ biometric.created_at }}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </main-layout>
</template>

<script setup>
import { routeDetails } from "@/stores/routeDetails.js";
import { filterTable } from "@/stores/search-filter";
import { ref, onMounted, computed, onUnmounted } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import ActionComponent from "@/components/reusables/ActionComponent.vue";
import { getBiometrics } from "@/apis/accountApi";
import { useStatusStyle } from "@/composables/useStatusStyle";
import { useStatusContent } from "@/composables/useStatusContent";
import { storeToRefs } from "pinia";
import { useSearchKeyword } from "../../stores/useSearchKeyword";

// store
const store = useSearchKeyword();
const { search } = storeToRefs(store);


const currentRoute = routeDetails();
currentRoute.name = "Biometric";
const filterTableStore = filterTable();

const isCheckedAll = ref(false);
const checkedCheckbox = ref(false);

const biometric = ref([]);

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
      selectedIds.value = biometric.value.map(item => item.id);
   }

}



onMounted(async () => {
   const biodata = await getBiometrics();
   let { data: biometricData } = biodata;

   biometricData = biometricData.data;
   biometricData.forEach((x) => {
      x.name = "" + (x.first_name ?? "") + " " + (x.last_name ?? "");
      x.smile_response = x.smile_response=="{}" ? "NO" : "YES"
   });
   biometric.value = biometricData;

   filterTableStore.allItems = biometric.value;
});


const biometricData = computed(() => {
   if (search.value.length > 0) {
      return biometric.value.filter((item) =>
         Object.values(item).some(
            (value) =>
               typeof value === "string" &&
               value.toLowerCase().includes(search.value.toLowerCase())
         )
      );
   }
   return biometric.value;
});


onUnmounted(() => {
   search.value = "";
});


</script>
