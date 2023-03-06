<template>
  <div class="container flex flex-col gap-6 bg-white p-8">
    <div class="mx-auto flex items-center justify-between" :class="customClass">
      <h2 class="max-auto text-lg font-bold">Residential Address</h2>
      <EditIcon />
    </div>

    <div
      class="mx-auto flex flex-col justify-between gap-y-4 text-md"
      :class="customClass"
    >
      <h2
        class="flex justify-between"
        v-for="({ title, value }, index) in address"
        :key="index"
      >
        <h2>{{ title }}</h2>
        <h2>{{ value }}</h2>
      </h2>
    </div>
  </div>
</template>

<script setup>
import EditIcon from "../icons/EditIcon.vue";
import { ref } from "vue";

const props = defineProps({
  customClass: {
    type: String,
    default: "w-full",
  },
  homeAddress: {
    type: String,
    default: "... ... ...",
  },
  city: {
    type: String,
    default: "... ... ...",
  },
  country: {
    type: String,
    default: "Nigeria",
  },
  state: {
    type: String,
    default: "... ... ...",
  },
  zipCode: {
    type: String,
    default: "... ... ...",
  },
});
const address = ref([
  {
    title: "Home Address",
    value: props.homeAddress,
  },
  {
    title: "City",
    value: props.city,
  },
  {
    title: "Country",
    value: props.country,
  },
  {
    title: "State",
    value: props.state,
  },
  {
    title: "Zip Code",
    value: props.zipCode,
  },
]);
</script>

<style lang="scss" scoped></style>
