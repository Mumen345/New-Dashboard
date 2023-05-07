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
                     <th>Work Email</th>
                     <th>Work Email Verified</th>
                     <th>Bio Ver.</th>
                     <th>Org Ver.</th>
                     <th>Work</th>
                     <th>Created</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="onboarding in onboardingData" :key="onboarding.id">
                     <td>
                        <input type="checkbox" class="checkbox" :checked="isCheckedAll" @click="updateCheckbox(onboarding.id)" />
                     </td>
                     <td>{{ onboarding.name }}</td>
                     <td>{{ onboarding.corp_email }}</td>
                     <td>
                        <span :class="useStatusStyle(onboarding.email_verified)" class="flex w-32 items-center justify-center rounded p-2 capitalize text-white">
                           {{ useStatusContent(onboarding.email_verified) }}</span>
                     </td>
                     <td>{{ onboarding.biometric_verified }}</td>
                     <td>{{ onboarding.user_corp_verified }}</td>
                     <td>{{ onboarding.user_corp }}</td>
                     <td>{{ onboarding.created_at }}</td>
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
import { getPublicOnboarding } from "@/apis/accountApi";
import { useStatusStyle } from "@/composables/useStatusStyle";
import { useStatusContent } from "@/composables/useStatusContent";
import { storeToRefs } from "pinia";
import { useSearchKeyword } from "../../stores/useSearchKeyword";

// store
const store = useSearchKeyword();
const { search } = storeToRefs(store);


const currentRoute = routeDetails();
currentRoute.name = "Public Onboarding";
const filterTableStore = filterTable();

const isCheckedAll = ref(false);
const checkedCheckbox = ref(false);

const onboarding = ref([]);

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
      selectedIds.value = onboarding.value.map(item => item.id);
   }

}



onMounted(async () => {
   const responsedata = await getPublicOnboarding();
   let { data: onboardingData } = responsedata;

   onboardingData = onboardingData.data;
   onboardingData.forEach((x) => {
      x.name = "" + (x.first_name ?? "") + " " + (x.last_name ?? "");
   });
   onboarding.value = onboardingData;

   filterTableStore.allItems = onboarding.value;
});


const onboardingData = computed(() => {
   if (search.value.length > 0) {
      return onboarding.value.filter((item) =>
         Object.values(item).some(
            (value) =>
               typeof value === "string" &&
               value.toLowerCase().includes(search.value.toLowerCase())
         )
      );
   }
   return onboarding.value;
});


onUnmounted(() => {
   search.value = "";
});


</script>
