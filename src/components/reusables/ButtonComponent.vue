<template>
   <button class="w-full rounded-md text-center text-sm bg-brand text-white py-4" :class="{'!py-0 opacity-70 cursor-not-allowed': disabled}" :disabled="disabled">
      <div v-if="!disabled">
         <component :is="component" />
         <p>{{ text }}</p>
      </div>
      <div class="flex justify-center py-2.5" v-else>
         <ButtonSpinner />
      </div>
   </button>
</template>

<script setup>
import ButtonSpinner from "@/assets/icons/ButtonSpinner.vue";
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "Login",
  },
  customClass: {
    type: String,
    default: "",
  },
  component: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped></style>
