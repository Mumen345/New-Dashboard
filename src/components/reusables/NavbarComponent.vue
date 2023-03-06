<template>
   <div class="flex h-20 w-full items-center justify-end gap-x-10 bg-white p-4">
      <h2 class="text-xl font-bold">{{ username }} </h2>
      <img :src="profilePicture" alt="" class="block h-12 w-12 rounded-full" />
   </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const username = ref("");
const profilePicture = ref("");
onMounted(async () => {
   const admin_id = localStorage.getItem("admin-id")
   const userProfileResponse = await axios.get(
      import.meta.env.VITE_API_URL + "/userprofile/" + admin_id + "?is_userid=true", {
      headers: {
         Authorization: "Bearer " + localStorage.getItem("auth-token")
      }
   }
   );
   username.value = userProfileResponse.data.data.first_name + " " + userProfileResponse.data.data.last_name;
   profilePicture.value = "data:image/png;base64, " + userProfileResponse.data.data.profile_picture_src;
});
</script>
