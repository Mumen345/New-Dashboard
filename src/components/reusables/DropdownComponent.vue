<template>
  <div
    class="container z-50 w-fit bg-white p-4"
    :class="customClass"
    v-if="state.showDropdown"
  >
    <p
      class="container m-1 bg-white p-3 text-xl font-medium hover:bg-brand hover:font-bold hover:text-white"
      v-for="(item, index) in selected"
      :key="index"
      @click="state.showDropdown = false"
    >
      {{ item }} Selected
    </p>
  </div>
</template>
<script setup>
import { globalState } from "@/stores/global-state.js";
import { ref } from "vue";
const state = globalState();

const selected = ref(["Delete", "Update", "Unmark", "Export"]);
defineProps({
  customClass: {
    type: String,
    default: "absolute top-[4rem] left-[4rem] ",
  },
});
</script>

<style lang="scss" scoped></style>
