<script setup>
import { ref, reactive, onMounted, computed, watch, onUnmounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
import MainLayout from "@/layouts/MainLayout.vue";
import ActionBar from "@/components/common/ActionBar.vue";
import ListItem from "@/components/ListItem.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";

import { getUsers, getUsersProfile } from "@/apis/accountApi";
import { exportCSV } from "../../apis/exportCSV";
import { useStatusStyle } from "@/composables/useStatusStyle";
import { useStatusContent } from "@/composables/useStatusContent";
import useRecordSort from "@/composables/useRecordSort";
import { storeToRefs } from "pinia";
import { useSearchKeyword } from "@/stores/useSearchKeyword";

const store = useSearchKeyword();
const search = ref('')
const { sortAsc, sortDesc } = useRecordSort()
const approveModal = ref(false)
const selectedUser = ref({})
const isCheckedAll = ref(false);
const checkedCheckbox = ref(false);
const selectedIds = ref([]); // check ids

let filters = reactive({
   sort_name: '',
   sort_email: '',
})


const isSelected = (id) => {
   return selectedIds.value.includes(id);
};

const doFilter = (type) => {
   console.log(userFinalData)

   if (type == 'name') {
      userFinalData.value.sort((a, b) => {
         return filters.sort_name == 'asc' ? sortAsc(a, b, 'name') : sortDesc(a, b, 'name')
      })
   }

   if (type == 'email') {
      userFinalData.value.sort((a, b) => {
         return filters.sort_email === 'asc' ? sortAsc(a, b, 'email') : sortDesc(a, b, 'email');
      })
   }
}

const toggleSelection = (id) => {
   if (isSelected(id)) {
      // Remove the id from the array
      const index = selectedIds.value.indexOf(id);
      selectedIds.value.splice(index, 1);
      console.log(selectedIds.value)
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
      selectedIds.value = userFinalData.value.map(item => item.id);
      console.log(selectedIds.value)
   }

}

function downloadTable() {
   exportCSV("Users");
}

const currentRoute = routeDetails();
currentRoute.name = "Users";
const users = ref([]);
onMounted(async () => {
   // get user data
   const userDetails = await getUsers();
   const { data: userData } = userDetails;

   //get user profile data
   const userProfile = await getUsersProfile();
   let { data: userProfileData } = userProfile;

   // combine the data
   userProfileData = userProfileData.data.map(({ id: upid, ...row }) => ({
      upid,
      ...row,
   }));
   userProfileData.forEach((x) => {
      x.name = "" + (x.first_name ?? "") + " " + (x.last_name ?? "");
      x.status = x.state.replace("profile_", "");
   });
   let userWithProfile = userData.data.map((user) =>
      Object.assign(
         {},
         user,
         userProfileData.find(
            (userprofileData) => userprofileData.user_id == user.id
         )
      )
   );
   userWithProfile.forEach((x) => {
      x.status = x.status ?? "no profile";
   });

   users.value = userWithProfile;
   // filterTableStore.allItems = users.value;
});

const userFinalData = computed(() => {
   if (search.value.length > 0) {
      return users.value.filter((item) =>
         Object.values(item).some(
            (value) =>
               typeof value === "string" &&
               value.toLowerCase().includes(search.value.toLowerCase())
         )
      );
   }
   return users.value;
});

function formatDate(value) {
   const newDate = new Date(value);
   return newDate.toLocaleDateString("default", {
      dateStyle: "medium",
   });
}

onUnmounted(() => {
   search.value = "";
});

</script>
<template>
   <main-layout>
      <div class="mb-4">
         <action-bar :showAction="isCheckedAll" :checkBoxIsClicked="checkedCheckbox" @search="(text) => search = text">
            <template v-slot:action>
               <a class="block text-sm w-full hover:bg-neutral-100 px-5 py-2.5 cursor-pointer">
                  View
               </a>
               <a @click="downloadTable()" class="block text-sm w-full hover:bg-neutral-100 px-5 py-2.5 cursor-pointer">
                  Download
               </a>
            </template>

            <template v-slot:filter>
               <div class="flex flex-col justify-between mb-5">
                  <list-item checked="asc" v-model="filters.sort_name" @click="doFilter('name')">
                     Name (A-Z)
                  </list-item>

                  <list-item checked="asc" v-model="filters.sort_email" @click="doFilter('email')">
                     Email (A-Z)
                  </list-item>
               </div>
            </template>
         </action-bar>

         <div class="mt-7 mb-8 overflow-x-auto rounded border bg-white px-0 sm:py-3 sm:px-3">
            <table class="table" id="table" width="100%">
               <thead class="thead-light">
                  <tr class="uppercase">
                     <th>
                        <input type="checkbox" @click="selectAll" />
                     </th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Phone Number</th>
                     <th>State</th>
                     <th>Created At</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="user in userFinalData" :key="user.id">
                     <td>
                        <input type="checkbox" class="checkbox" :checked="isCheckedAll" @click="updateCheckbox(user.id)" />
                     </td>
                     <td>{{ user.name }}</td>
                     <td>{{ user.email }}</td>
                     <td>{{ user.phone_number }}</td>
                     <td>
                        <span :class="useStatusStyle(user.status)" class="flex w-32 items-center justify-center rounded p-2 capitalize text-white">
                           {{ useStatusContent(user.status) }}</span>
                     </td>
                     <td>{{ formatDate(user.created_at) }}</td>
                     <td>
                        <div class="static">
                           <a type="button" class="text-lg font-bold text-neutral-400 hover:text-blue-500" data-dropdown-toggle="dropdown" data-popper-placement="bottom-end">
                              <i class="material-icons pointer-events-none">more_horiz</i>
                           </a>
                           <div class="z-10 hidden w-48 rounded bg-white py-5">
                              <router-link :to="`/admin/users/${user.id}`" class="block w-full cursor-pointer px-5 py-2 text-base hover:bg-blue-100">View</router-link>
                              <a class="block w-full cursor-pointer px-5 py-2 text-base hover:bg-blue-100" @click="e => { selectedUser = user; approveModal = true }">
                                 Approve user
                              </a>
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

      <!-- Modal section -->
      <confirm-modal :hidden="approveModal" @close="approveModal = false">
         <div class="text-base text-slate-700 text-center mb-7 mt-5">
            You are about to approve the selected user account
            please proceed by clicking the button below. if you are sure of this.
         </div>

         <div class="flex items-center justify-end gap-x-3">
            <button class="btn-light px-5 py-2.5 rounded-md" @click="e => { approveModal = false; selectedUser = {} }">Cancel</button>
            <button class="btn-primary px-5 py-2.5 rounded-md">Procced</button>
         </div>
      </confirm-modal>
   </main-layout>
</template>
