<template>
  <div
    class="container flex w-full py-4 flex-col items-center justify-between bg-white text-white"
  >
    <img
      :src="backgroundImage"
      alt=""
      class="mt-8 block h-[15rem] w-[16rem] rounded-lg"
    />
    <p class="my-12 mx-auto text-center text-lg font-bold text-brand-dark">
      {{ firstname }} {{ lastname }}
    </p>

    <ButtonComponent
      :text="total"
      customStyle="height: 40px; width: 16rem; padding:5px; font-size: 1.4rem"
    />

    <!-- Users Location , Email and Phone container  -->
    <div
      class="mt-[2.5rem] flex h-[14.6rem] w-full flex-col items-center justify-center gap-y-4 bg-brand-gray text-[1.3rem] text-brand-dark"
    >
      <div class="flex items-center gap-x-5">
        <LocationIcon />
        <p>{{ address }}</p>
      </div>
      <div class="flex items-center gap-x-5">
        <EmailIcon />
        <p>{{ email }}</p>
      </div>
      <div class="flex items-center gap-x-5" v-if="showPhone">
        <PhoneIcon />
        <p>{{ phone }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonComponent from "@/components/reusables/ButtonComponent.vue";
import LocationIcon from "../icons/LocationIcon.vue";
import EmailIcon from "../icons/EmailIcon.vue";
import PhoneIcon from "../icons/PhoneIcon.vue";

const props = defineProps({
  backgroundImage: {
    type: String,
    default: "https://xsgames.co/randomusers/avatar.php?g=male",
  },
  firstname: {
    type: String,
    default: "NA",
  },
  lastname: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    default: "na",
  },
  address: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "na",
  },
  prefix: {
    type: String,
    default: "Spent: ₦",
  },
  showPhone: {
    type: Boolean,
    default: true,
  },
});
const total = ref(props.prefix + props.amount);
</script>

<style lang="scss" scoped></style>
