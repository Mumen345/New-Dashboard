<template>
    <div class="mb-4">
    <ActionComponent />
  </div>
  <div>
    <TableGridComponent
      :headings="headings"
      :list="users"
      route="organizations"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { routeDetails } from "@/stores/routeDetails";
import { filterTable } from "@/stores/search-filter";
import TableGridComponent from "@/components/reusables/TableGridComponent.vue";
import ActionComponent from "@/components/reusables/ActionComponent.vue";

const currentRoute = routeDetails();
const filterTableStore = filterTable();
const users = ref([]);
const headings = ref(["name", "refcode", "owner_id", "status", "description"]);
onMounted(async () => {
  const { data } = await axios.get(import.meta.env.VITE_API_URL + "/networks");
  if (data) users.value = data.data;

  currentRoute.name = "Networks";
  filterTableStore.allItems = users.value;
});
</script>

<style lang="scss" scoped></style>
