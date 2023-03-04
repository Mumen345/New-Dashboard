<template>
  <div
    class="mx-auto flex w-full flex-col rounded-lg bg-[#2AAA0B] p-2 text-white shadow-sm shadow-brand"
  >
    <div class="mb-6 flex items-center justify-between">
      <CreditCardChipIcon />
      <p class="text-md">VISA</p>
    </div>
    <p class="text-lg mb-6">{{ cardDetails.cardNumber }}</p>
    <div class="flex items-center justify-between uppercase">
      <div>
        <p class="text-xs">CARD HOLDER</p>
        <p class="text-xs font-bold">{{ cardDetails.cardName }}</p>
      </div>
      <div>
        <p class="text-xs">EXPIRE</p>
        <p class="text-xs font-bold">
          {{ cardDetails.cardMonth }} / {{ cardDetails.cardYear }}
        </p>
      </div>
    </div>
  </div>
  <!-- <VuePaycard background-image="https://xsgames.co/randomusers/avatar.php?g=male" :value-Fields="valueFields" /> -->
</template>

<script setup>
// import VuePaycard from "vue-paycard";
import CreditCardChipIcon from "./icons/CreditCardChipIcon.vue";
// import { ref } from "vue";
// eslint-disable-next-line no-unused-vars
defineProps({
  cardDetails: {
    type: Object,
    default() {
      return {
        cardName: "Olto Jacob",
        cardNumber: "5349 2590 6178 0396",
        cardMonth: "07",
        cardYear: "2022",
        cardCvv: "398",
      };
    },
  },
});
</script>

<style lang="scss" scoped></style>
