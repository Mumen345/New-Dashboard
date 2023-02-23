<template>
  <div
    class="mx-auto flex h-[20.4rem] w-[90%] flex-col justify-between rounded-lg bg-[#2AAA0B] p-4 text-white shadow-lg shadow-brand"
  >
    <div class="flex items-center justify-between">
      <CreditCardChipIcon />
      <p class="text-[2.5rem]">VISA</p>
    </div>
    <p class="text-center text-4xl">{{ cardDetails.cardNumber }}</p>
    <div class="flex items-center justify-between uppercase">
      <div>
        <p class="text-[0.945rem] font-[300]">CARD HOLDER</p>
        <p class="text-[1.45rem]">{{ cardDetails.cardName }}</p>
      </div>
      <div>
        <p class="text-[0.945rem] font-[300]">EXPIRE</p>
        <p class="text-[1.45rem]">
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
