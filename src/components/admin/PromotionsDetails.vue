<template>
   <div class="flex flex-col justify-around bg-white px-5 py-8">
      <div class="flex items-center justify-between">
         <h2 class="mb-4 text-lg font-bold">Promotions</h2>
      </div>

      <div class="flex h-[18.6rem] flex-col gap-y-[3rem] mt-[3rem]">
         <h2 class="flex justify-between text-md" v-for="({ title, value }, index) in promotions" :key="index">
            <h2>{{ title }}</h2>
            <h2>{{ value }}</h2>
         </h2>
      </div>
   </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
   maximum: {
      type: String || Number,
      default: "30",
   },
   expiryDate: {
      type: String,
      default: "16th 20, 2003",
   },
   ridesLeft: {
      type: String || Number,
      default: "400",
   },
   areas: {
      type: String,
      default: "Lagos",
   },
});
const promotions = ref([
   {
      title: "Maximum promo",
      value: "$" + props.maximum,
   },
   {
      title: "Expiry Date",
      value: props.expiryDate,
   },
   {
      title: "PromoRidesLeft",
      value: props.ridesLeft,
   },
   {
      title: "Areas",
      value: props.areas,
   },
]);
</script>

<style lang="scss" scoped></style>
