import { ref } from "vue";
import { defineStore } from "pinia";

export const globalState = defineStore("global-state", () => {
  const showDropdown = ref(false);
  return { showDropdown };
});
