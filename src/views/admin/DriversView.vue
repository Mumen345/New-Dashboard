<template>
  <div>
    <div class="mb-4">
      <ActionComponent />
    </div>

    <TableGridComponent
      :headings="headings"
      :list="drivers"
      route="organizations"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { routeDetails } from "@/stores/routeDetails.js";
import { filterTable } from "@/stores/search-filter";
import { ref, onMounted } from "vue";
import TableGridComponent from "@/components/reusables/TableGridComponent.vue";
import ActionComponent from "@/components/reusables/ActionComponent.vue";

// store
const currentRoute = routeDetails();
currentRoute.name = "Drivers";
const filterTableStore = filterTable();

const drivers = ref([]);
const headings = ref(["user_id", "license", "insurance", "verified", "..."]);
onMounted(async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + "/drivers");
  if (data) drivers.value = data.data;
  
  filterTableStore.allItems = drivers.value;
});
</script>

<style lang="scss" scoped></style>
