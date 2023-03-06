<template>
  <div class="mb-4">
    <ActionComponent />
  </div>
  <div class="relative h-full w-full">
    <TableGridComponent
      :headings="headings"
      :list="users"
      route="users"
      :gridHead="'grid-template-columns: 1fr 2fr 3fr 3fr 2fr 1fr'"
      :gridTable="'grid-template-columns: 0.5fr 2fr 3fr 3fr 2fr 1fr'"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
import { filterTable } from "@/stores/search-filter";
import TableGridComponent from "@/components/reusables/TableGridComponent.vue";
import ActionComponent from "@/components/reusables/ActionComponent.vue";

const currentRoute = routeDetails();
const filterTableStore = filterTable();
const users = ref([]);
const headings = ref(["name", "email", "phone_number", "state", "created_at"]);
onMounted(async () => {
  var userResponse = await axios.get(import.meta.env.VITE_API_URL + "/users", {
    headers: { 
      Authorization: "Bearer " + localStorage.getItem ("auth-token")
    }
  });
  var userProfileResponse = await axios.get(import.meta.env.VITE_API_URL + "/userprofiles", {
    headers: { 
      Authorization: "Bearer " + localStorage.getItem ("auth-token")
    }
  });
  var userData = userResponse.data.data;
  var userProfileData = userProfileResponse.data.data;
  userProfileData = userProfileData.map(({id:upid, ...row}) => ({upid, ...row}));
  userProfileData.forEach((x) => {
    x.name = ""+(x.first_name??'')+" "+(x.last_name??'');
    x.status = x.state.replace("profile_", "");
  });
  var userWithProfile = userData.map(
    user => Object.assign({},
    user, userProfileData.find(userprofile => userprofile.user_id == user.id))
  );
  userWithProfile.forEach((x) => {
    x.status = x.status??'no profile';
  });
  users.value = userWithProfile;
  currentRoute.name = "Users";
  filterTableStore.allItems = users.value;
});
</script>

<style>
.main-grid {
  grid-template-columns: 1fr 2fr 3fr 3fr 2fr 1fr;
}
</style>
