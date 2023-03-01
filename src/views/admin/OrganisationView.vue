<template>
  <div>
   <div class="flex items-center bg-white border rounded p-3 md:p-5 mt-7">
      <div class="grow relative">
         <input type="search" id="search" placeholder="Search" class="form-control rounded " autocomplete="current-text">
      </div>

      <div class="static ml-3">
         <a class="flex items-center border rounded px-3 py-3 relative" id="droplk" data-dropdown-toggle="dropdown" data-popper-placement="bottom-end">
            <FilterIcon class="text-neutral-400 pointer-events-none" />
            <span class="hidden md:block text-sm font-normal text-black ml-2 pointer-events-none">Filter</span>
         </a>
         <div class="z-10 hidden bg-white rounded shadow-xl border border-neutral-200 w-48 dropdown-menu pt-4 pb-7">
               <list-item checked="asc">Name (A-Z)</list-item>
               <list-item checked="desc">Name (Z-A)</list-item>
         </div>
      </div>
   </div>

    <div class="bg-white border rounded px-0 sm:py-3 sm:px-3 mt-7 mb-8 overflow-x-auto">
         <table class="table" id="table" width="100%">
            <thead class="thead-light">
               <tr class="uppercase">
                  <th>
                     <input type="checkbox" class="checkbox">
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Domain Name</th>
                  <th>status</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="organisation in organizations">
                  <td></td>
                  <td>{{ organisation.id }}</td>
                  <td>{{ organisation.name }}</td>
                  <td>{{ organisation.domain_name }}</td>
                  <td>{{ organisation.status }}</td>
                  <td>
                     <div class="static">
                        <a type="button" class="text-lg font-bold text-neutral-400 hover:text-blue-500" data-dropdown-toggle="dropdown" data-popper-placement="bottom-end">
                           <i class="material-icons pointer-events-none">more_horiz</i>
                        </a>
                        <div class="hidden bg-white z-10 rounded py-5 w-48">
                           <a class="block text-base w-full hover:bg-blue-100 px-5 py-2">Action</a>
                        </div>
                     </div>
                  </td>
               </tr> 
            </tbody>
         </table>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
import { filterTable } from "@/stores/search-filter";
import { getOrganizations } from '@/apis/accountApi';
import ListItem from '@/components/ListItem.vue';
import SortIcon from "@/components/icons/SortIcon.vue";
import FilterIcon from "@/components/icons/FilterIcon.vue";

const currentRoute = routeDetails();
const filterTableStore = filterTable();
let organizations = ref([]);
const filters = ref([])

onMounted(async () => {
  const response = await getOrganizations();
   const { data } = response;

  var orgsData = data.data;
  orgsData = orgsData.map((x) => ({...x,status:true?"verified":"not_verified"}));
   if (data) {
      organizations.value = orgsData;
  }
  currentRoute.name = "Organizations";
  filterTableStore.allItems = organizations.value;
});
</script>