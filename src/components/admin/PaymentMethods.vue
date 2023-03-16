<template>
  <div class="flex w-full flex-col bg-white px-5">
    <div class="flex h-full flex-col">
      <div class="flex items-center justify-between gap-2 py-8">
        <h2 class="text-lg font-bold">Payment Methods</h2>
        <EditIcon />
      </div>
      <div class="mb-[5rem]">
        <CreditCardComponent :cardDetails="creditCard" />

        <div class="my-10 flex flex-col gap-y-[1.5rem] bg-brand-gray p-3">
          <h2
            class="text-md flex items-center"
            v-for="({ title, value }, index) in cardInfo"
            :key="index"
          >
            <h2 class="text-sm w-20">{{ title }}:</h2>
            <h2 class="text-sm font-semibold">{{ value }}</h2>
          </h2>
        </div>
      </div>
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
