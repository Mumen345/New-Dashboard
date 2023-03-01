<template>
  <div class="relative w-full overflow-x-hidden">
    <div
      :style="gridRows"
      class="bold absolute grid w-full items-center justify-center bg-white p-4 text-2xl uppercase"
    >
      <input
        type="checkbox"
        name=""
        id=""
        v-model="checkAll"
        :checked="checkAll"
        class="border-brand-light text-4xl text-brand-dark focus:border-none focus:outline-none"
      />
      <p
        v-for="(head, index) in headings"
        :key="index"
        class="flex items-center text-xl font-semibold"
      >
        <span class="block"> {{ head.replaceAll("_", " ") }}</span>
        <span class="material-icons block" v-if="index !== headings.length - 1"
          >arrow_drop_down</span
        >
      </p>
    </div>

    <div class="mt-20">
      <RouterLink
        :to="{ name: route, params: { id: item.id || item.user_id } }"
        :style="gridRows"
        class="main-grid my-2 grid items-center justify-center p-4 px-4 text-left text-xl text-brand-dark"
        v-for="(item, index) in filteredTable"
        :key="index"
        :class="index % 2 === 0 ? 'bg-brand-light' : 'bg-white'"
      >
        <input
          type="checkbox"
          name=""
          id=""
          v-model="checkAll"
          :checked="checkAll"
          class="text-brand-dark"
        />
        <p>{{ item[headings[0]] || "" }}</p>
        <p>{{ item[headings[1]] || "" }}</p>
        <p>{{ item[headings[2]] || "" }}</p>
        <p>
          <span v-if="item.status">
            <span
              :class="statusStyles(item.status)"
              class="flex w-24 items-center justify-center rounded p-2 text-white"
            >
              {{ item.status }}</span
            >
          </span>
          <span v-else>{{ item[headings[3]] || "" }}</span>
        </p>
        <p>...</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { filterTable } from "@/stores/search-filter";
import { onMounted, ref, watch, onUnmounted } from "vue";
const filterTableStore = filterTable();
const checkAll = ref(false);
const statusStyles = (status) => {
  if (["active", "verified", "true"].includes(status)) return "bg-brand";
  if (["rejected","not_verified", "false"].includes(status)) return "bg-red-500";
  if (["request"].includes(status)) return "bg-yellow-400";
  return "bg-gray-400";
};
const filteredTable = ref([]);
defineProps({
  headings: {
    type: Object,
  },
  list: {
    type: Object,
  },
  gridRows: {
    type: String,
  },
  route: {
    type: String,
    default: "",
  },
});

watch(
  () => filterTableStore.allItems,
  () => {
    filteredTable.value = filterTableStore.searchUsers();
    console.log({ watch: filteredTable.value });
  }
);
watch(
  () => filterTableStore.input,
  () => {
    filteredTable.value = filterTableStore.searchUsers();
    console.log({ watch: filteredTable.value });
  }
);

// onMounted(() => {
//   filteredTable.value = filterTableStore.allItems;
// });

onUnmounted(() => {
  filterTableStore.input = "";
});
</script>

<style lang="scss" scoped></style>
