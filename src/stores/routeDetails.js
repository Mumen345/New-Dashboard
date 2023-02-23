import { ref } from "vue";
import { defineStore } from "pinia";

export const routeDetails = defineStore("route-details", () => {
  const name = ref("Users");
  const showDetails = ref(true)
  return { name, showDetails };
});