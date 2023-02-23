<template>
  <div class="flex flex-col justify-between gap-[2rem]">
    <h1 class="text-[3rem] font-bold">Account Information</h1>
    <div class="profile-grid grid gap-x-[2rem]">
      <ProfileInfomation
        :firstname="profileInfomation.firstname"
        :lastname="profileInfomation.lastname"
        :email="profileInfomation.email"
        :phone="profileInfomation.phone"
        :address="profileInfomation.address"
        :backgroundImage="profileInfomation.backgroundImage"/>
      <div class="grid grid-rows-2 gap-[2.2rem]">
        <AccountDetails
          :firstname="accountInformation.firstname"
          :lastname="accountInformation.lastname"
          :gender="accountInformation.gender"
          :state="accountInformation.state"/>
        <ResidentialAddress />
      </div>
      <PaymentMethods />
    </div>

    <div style="grid-template-columns: 3fr 2fr" class="grid gap-[2rem]">
      <RideHistory />
      <div class="flex flex-col gap-[2rem]">
        <div class="grid grid-cols-2 gap-[2rem]">
          <TotalRidesCount />
          <TotalCancelledRides />
        </div>
        <PromotionsDetails />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileInfomation from "@/components/admin/ProfileInfomation.vue";
import AccountDetails from "@/components/admin/AccountDetails.vue";
import ResidentialAddress from "@/components/admin/ResidentialAddress.vue";
import PaymentMethods from "@/components/admin/PaymentMethods.vue";
import RideHistory from "@/components/admin/RideHistory.vue";
import TotalRidesCount from "@/components/admin/TotalRidesCount.vue";
import TotalCancelledRides from "@/components/admin/TotalCancelledRides.vue";
import PromotionsDetails from "@/components/admin/PromotionsDetails.vue";

import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.id;
const profileInfomation = ref({});
const accountInformation = ref({});

const getUserData = async () => {
  const userResponse = await axios.get(import.meta.env.VITE_API_URL + "/user/"+userId);
  const user = userResponse.data.data;
  var userProfile = {};
  await axios.get(
    import.meta.env.VITE_API_URL + "/userprofile/"+userId+"?is_userid=true"
  ).then((response)=> {
    userProfile = response.data.data;
    profileInfomation.value = {
      firstname:userProfile.first_name,
      lastname:userProfile.last_name,
      address:userProfile.address,
      email:user.email,
      phone: user.phone_number,
      backgroundImage: "data:image/png;base64, "+userProfile.profile_picture_src
    };
    accountInformation.value = {
    firstname:userProfile.first_name,
    lastname:userProfile.last_name,
    gender:userProfile.gender,
    state:userProfile.state
  };
    }
  ).catch((error)=>{
    profileInfomation.value = {
      email:user.email,
      phone: user.phone_number
    };
  });  
};

onMounted(() => getUserData());
</script>

<style lang="scss" scoped>
.profile-grid {
  grid-template-columns: 27.2rem 1fr 1fr;
}
</style>
