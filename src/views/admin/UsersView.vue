<template>
  <div class="mb-4">
    <ActionComponent
      :showAction="isCheckedAll"
      :checkBoxIsClicked="checkedCheckbox"
    />

    <div
      class="mt-7 mb-8 overflow-x-auto rounded border bg-white px-0 sm:py-3 sm:px-3"
    >
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
              <input
                type="checkbox"
                class="checkbox"
                :checked="isCheckedAll"
                @click="updateCheckbox(user.id)"
              />
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
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
// import { filterTable } from "@/stores/search-filter";
import ActionComponent from "@/components/reusables/ActionComponent.vue";
import { getUsers, getUsersProfile } from "@/apis/accountApi";
import { useStatusStyle } from "@/composables/useStatusStyle";
import { useStatusContent } from "@/composables/useStatusContent";
import { storeToRefs } from "pinia";
import { useSearchKeyword } from "@/stores/useSearchKeyword";

const store = useSearchKeyword();
const { search } = storeToRefs(store);

const isCheckedAll = ref(false);
const checkedCheckbox = ref(false);

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

function selectAll(){
  isCheckedAll.value = !isCheckedAll.value
  if(selectedIds.value.length > 0){
    selectedIds.value.splice(0, selectedIds.value.length);
  } else{
    selectedIds.value = userFinalData.value.map(item => item.id);
    console.log(selectedIds.value)
  }
  
}

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
