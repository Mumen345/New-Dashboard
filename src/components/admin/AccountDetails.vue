<template>
  <div class="container flex flex-col gap-6 bg-white p-8">
    <div class="flex items-center justify-between" :class="customClass">
      <h2 class="text-lg font-bold">Account Details</h2>
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
import { ref, toRefs } from "vue";

const props = defineProps({
  firstname: {
    type: String,
    default: "NA",
  },
  lastname: {
    type: String,
    default: "NA",
  },
  state: {
    type: String,
    default: "no_profile",
  },
  gender: {
    type: String,
    default: "NA",
  },
  customClass: {
    type: String,
    default: "w-full",
  },
});
const data = toRefs(props);

const address = ref([
  {
    title: "First Name",
    value: data.firstname,
  },
  {
    title: "Last Name",
    value: data.lastname,
  },
  {
    title: "Gender",
    value: data.gender,
  },
  {
    title: "Profile Status",
    value: data.state,
  },
]);
</script>

<style lang="scss" scoped></style>
