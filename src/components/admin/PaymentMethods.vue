<template>
  <div
    class="container flex w-full flex-col justify-between bg-white"
  >
    <div class="flex h-full flex-col justify-between">
      <div class="m-4 flex items-center justify-between">
        <h2 class="mb-4 text-[1.7rem] font-bold">Payment Methods</h2>
        <EditIcon />
      </div>
      <div class="mx-4 mb-[5rem]">
        <CreditCardComponent :cardDetails="creditCard" />
      </div>
    </div>
    <div
      class="flex h-[20.6rem] flex-col gap-y-[3rem] bg-brand-gray p-[2.6rem]"
    >
      <h2
        class="flex justify-between text-[1.3rem]"
        v-for="({ title, value }, index) in cardInfo"
        :key="index"
      >
        <h2>{{ title }}</h2>
        <h2>{{ value }}</h2>
      </h2>
    </div>
  </div>
</template>

<script setup>
import CreditCardComponent from "../CreditCardComponent.vue";
import EditIcon from "../icons/EditIcon.vue";
import { reactive, ref } from "vue";
const month = ref("04");
const year = ref("2028");
const cardDetails = reactive({
  cardType: "VISA",
  cardHolder: "Ololade MrMoney",
  expire: month.value + "/" + year.value,
  cardNumber: "2898 3663 3882 9920",
  cvv: "890",
});
const cardInfo = reactive([
  { title: "Type", value: cardDetails.cardType },
  { title: "Card Holder", value: cardDetails.cardHolder },
  { title: "Expire", value: cardDetails.expire },
  { title: "Card Number", value: cardDetails.cardNumber },
]);
const creditCard = ref({
  cardName: cardDetails.cardHolder,
  cardNumber: cardDetails.cardNumber,
  cardMonth: month.value,
  cardYear: year.value,
  cardCvv: cardDetails.cvv,
});
</script>

<style lang="scss" scoped></style>
