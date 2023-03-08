<template>
  <div class="mb-4">
    <ActionComponent :showAction="isCheckedAll" :checkBoxIsClicked="checkedCheckbox" />

    <div
      class="mt-7 mb-8 overflow-x-auto rounded border bg-white px-0 sm:py-3 sm:px-3"
    >
      <table class="table" id="table" width="100%">
        <thead class="thead-light">
          <tr class="uppercase">
            <th>
              <input type="checkbox" @click="isCheckedAll = ! isCheckedAll" />
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
          <tr v-for="user in users" :key="user.id">
            <td>
              <input type="checkbox" class="checkbox" :checked="isCheckedAll" @click="updateCheckbox" />
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone_number }}</td>
            <td>
              <span
                :class="useStatusStyle(user.status)"
                class="flex w-32 items-center justify-center rounded p-2 capitalize text-white"
              >
                {{ useStatusContent(user.status) }}</span
              >
            </td>
            <td>{{ formatDate(user.created_at) }}</td>
            <td>
              <div class="static">
                <a
                  type="button"
                  class="text-lg font-bold text-neutral-400 hover:text-blue-500"
                  data-dropdown-toggle="dropdown"
                  data-popper-placement="bottom-end"
                >
                  <i class="material-icons pointer-events-none">more_horiz</i>
                </a>
                <div class="z-10 hidden w-48 rounded bg-white py-5">
                  <a
                    class="block w-full cursor-pointer px-5 py-2 text-base hover:bg-blue-100"
                    >View</a
                  >
                  <a
                    class="block w-full cursor-pointer px-5 py-2 text-base hover:bg-blue-100"
                  >
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
</template>

<script setup>

import { ref, onMounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
// import { filterTable } from "@/stores/search-filter";
import ActionComponent from "@/components/reusables/ActionComponent.vue";
import { getUsers, getUsersProfile } from "@/apis/accountApi";
import { useStatusStyle } from "@/composables/useStatusStyle";
import { useStatusContent } from "@/composables/useStatusContent";

const isCheckedAll = ref(false);
const checkedCheckbox = ref(false);

const currentRoute = routeDetails();
currentRoute.name = "Users";
// const filterTableStore = filterTable();
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

function formatDate(value) {
  const newDate = new Date(value);
  return newDate.toLocaleDateString("default", {
    dateStyle: "medium",
  });
}

function updateCheckbox(){
  if(document.querySelector('.checkbox:checked')){
    return checkedCheckbox.value = true
  }
  checkedCheckbox.value = false
}


</script>
