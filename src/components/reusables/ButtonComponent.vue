<template>
  <button
    :class="customClass"
    :style="customStyle"
    :disabled="disabled"
  >
    <div
      class="flex h-full w-full items-center justify-center gap-x-8 rounded-lg"
      v-if="!disabled"
    >
      <component :is="component" />
      <p>{{ text }}</p>
    </div>
    <div
      class="border-1 flex h-full w-full cursor-not-allowed items-center justify-center rounded border-green-500 bg-white"
      v-else
    >
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
    default: "block w-full rounded-lg text-center text-[1.6rem] bg-brand text-white",
  },
  customStyle: {
    type: String,
    default: "height: 50px",
  },
  component: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped></style>
