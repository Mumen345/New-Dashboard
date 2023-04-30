<template>
   <div class="relative w-full overflow-x-hidden" v-if="!filterTableStore.isEmpty">
      <div :style="gridHead" class="bold absolute top-0 grid w-full items-center justify-center bg-white p-4 text-lg uppercase">
         <input type="checkbox" name="" id="" v-model="checkAll" :checked="checkAll" @click="
            checkAll === true
               ? (state.showDropdown = false)
               : (state.showDropdown = true)
         " class="border-brand-light text-4xl text-brand-dark focus:border-none focus:outline-none" />
         <p v-for="(head, index) in headings" :key="index" class="flex items-center text-sm font-semibold">
            <span class="block"> {{ head.replaceAll("_", " ") }}</span>
            <span class="material-icons block" v-if="index !== headings.length - 1">arrow_drop_down</span>
         </p>
      </div>

      <div class="mt-20">
         <div class="flex items-center justify-between" v-for="(item, index) in filteredTable" :key="index" :class="index % 2 === 0 ? 'bg-brand-light' : 'bg-white'">
            <input type="checkbox" name="" id="" :checked="checkAll" class="ml-4" />
            <RouterLink :to="{ name: route, params: { id: item.id || item.user_id } }" :style="gridTable"
               class="main-grid my-2 grid w-full items-center justify-center p-4 px-4 text-left text-sm text-brand-dark">
               <p></p>
               <p>{{ item[headings[0]] || "" }}</p>
               <p>{{ item[headings[1]] || "" }}</p>
               <p>{{ item[headings[2]] || "" }}</p>
               <p>
                  <span v-if="item.status">
                     <span :class="statusStyles(item.status)" class="flex w-32 items-center justify-center rounded p-2 capitalize text-white">
                        {{
                           statusContent(item.status)
                        }}</span>
                  </span>
                  <span v-else-if="item.verified">
                     <span :class="statusStyles(item.verified)" class="flex w-32 items-center justify-center rounded p-2 capitalize text-white">
                        {{
                           statusContent(item.verified)
                        }}</span>
                  </span>
                  <span v-else>{{ item[headings[3]] || "" }}</span>
               </p>
               <p>
                  <span v-if="item[headings[4]]">
                     {{ validateForDates(item[headings[4]]) }}
                  </span>
                  <span v-else> ...</span>
               </p>
            </RouterLink>
         </div>
      </div>
   </div>
   <div class="flex w-full items-center justify-center bg-white" v-else>
      <img :src="EmptyResult" alt="" class="h-[34rem] w-full" />
   </div>
</template>

<script setup>
import { filterTable } from "@/stores/search-filter";
import { globalState } from "@/stores/global-state";
import { ref, watch, onUnmounted } from "vue";
import EmptyResult from "@/assets/svg/EmptyResult.svg";
const filterTableStore = filterTable();
const state = globalState();
const checkAll = ref(false);
// setting styles for stastus field in the grid component
const statusStyles = (status) => {
   if (["active", "verified", "true", true].includes(status)) return "bg-brand";
   if (["rejected", "not verified", "false", "no profile", false].includes(status)) return "bg-red-500";
   if (["request", "registered", "confirmed"].includes(status)) return "bg-yellow-400";
   return "bg-gray-400";
};

const statusContent = (status) => {
   if (status === "active" || status === true) return "active";
   if (status === "request") return "request";
   if (status === "rejected") return "rejected";
   if (status === false) return "inactive";
   return status;
};

const validateForDates = (value) => {
   if (Date.parse(value)) {
      const newDate = new Date(value);
      return newDate.toLocaleDateString("default", {
         dateStyle: "medium",
      });
   } else return value;
};

const filteredTable = ref([]);

defineProps({
   headings: {
      type: Object,
   },
   list: {
      type: Object,
   },
   gridHead: {
      type: String,
      default: "grid-template-columns: 1fr 2fr 3fr 3fr 2fr 1fr",
   },
   gridTable: {
      type: String,
      default: "grid-template-columns: 0.5fr 2fr 3fr 3fr 2fr 1fr",
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
   }
);
watch(
   () => filterTableStore.input,
   () => {
      filteredTable.value = filterTableStore.searchUsers();
   }
);

onUnmounted(() => {
   filterTableStore.input = "";
});
</script>
