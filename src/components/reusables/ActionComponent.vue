<template>
   <div class="mb-5 flex items-center justify-between border bg-white px-6 py-4">
      <input type="text" class="form-control mr-3" v-model.lazy="filterTableStore.input" placeholder="Search" @keyup.enter="filterTableStore.searchUsers" />
      <div class="flex items-center border rounded text-sm px-3 py-3 mr-3">
         <p class="whitespace-nowrap mr-2">Sort By: {{ sort }}</p>
         <SortIcon />
      </div>
      <div class="flex items-center border rounded px-3 py-3">
         <FilterIcon />
         <p class="ml-2 text-sm">Filter</p>
      </div>
   </div>
</template>

<script setup>
import SortIcon from "../icons/SortIcon.vue";
import FilterIcon from "../icons/FilterIcon.vue";
import { filterTable } from "@/stores/search-filter";
import { ref } from "vue";
const filterTableStore = filterTable();
const sort = ref("Recent");
</script>
