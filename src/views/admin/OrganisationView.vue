<template>
  <div>
   
   <ActionComponent />

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
                  <td>
                     <input type="checkbox" class="checkbox">
                  </td>
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
import { ref, onMounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
import { filterTable } from "@/stores/search-filter";
import ActionComponent from "@/components/reusables/ActionComponent.vue";
import { getOrganizations } from '@/apis/accountApi';


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