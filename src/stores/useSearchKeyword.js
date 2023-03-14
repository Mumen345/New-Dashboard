import { defineStore } from "pinia";
import {ref } from "vue";

export const useSearchKeyword = defineStore("searchKeyword", () => {

  const search = ref("");

  return { search};
});
