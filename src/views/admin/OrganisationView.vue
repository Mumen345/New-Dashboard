<template>
  <div>
    <TableGridComponent
      :headings="headings"
      :list="orgs"
      route="organizations"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
import { filterTable } from "@/stores/search-filter";
import TableGridComponent from "@/components/reusables/TableGridComponent.vue";

const currentRoute = routeDetails();
const filterTableStore = filterTable();
const orgs = ref([]);
const headings = ref(["id", "name", "domain_name", "status",  "created_at"]);
onMounted(async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/organizations"
  );
  var orgsData = data.data;
  orgsData = orgsData.map((x) => ({...x,status:true?"verified":"not_verified"}));
  if (data) orgs.value = orgsData;
  currentRoute.name = "Organizations";
  filterTableStore.allItems = orgs.value;
});
</script>

<style lang="scss" scoped></style>
