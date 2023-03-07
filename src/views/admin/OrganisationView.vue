<template>
  <div>
   <ActionComponent :showAction="isCheckedAll" :checkBoxIsClicked="checkedCheckbox" />

    <div
      class="mt-7 mb-8 overflow-x-auto rounded border bg-white px-0 sm:py-3 sm:px-3"
    >
      <table class="table" id="table" width="100%">
        <thead class="thead-light">
          <tr class="uppercase">
            <th>
               <input type="checkbox" @click="isCheckedAll = ! isCheckedAll" />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Domain Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="organisation in organizations" :key="organisation.id">
            <td>
               <input type="checkbox" class="checkbox" :checked="isCheckedAll" @click="updateCheckbox" />
            </td>
            <td>{{ organisation.id }}</td>
            <td>{{ organisation.name }}</td>
            <td>{{ organisation.domain_name }}</td>
            <td>{{ organisation.status }}</td>
            <td>
              <div class="static">
                <a
                  type="button"
                  class="text-lg font-bold text-neutral-400 hover:text-blue-500"
                  data-dropdown-toggle="dropdown"
                  data-popper-placement="bottom-end"
                >
                  <i class="material-icons pointer-events-none">more_horiz</i>
                </a>
                <div class="z-10 hidden w-48 rounded bg-white py-5">
                  <a
                    class="block w-full cursor-pointer px-5 py-2 text-base hover:bg-blue-100"
                    >View</a
                  >
                  <a
                    class="block w-full cursor-pointer px-5 py-2 text-base hover:bg-blue-100"
                  >
                    Delete
                  </a>
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
import { getOrganizations } from "@/apis/accountApi";

const currentRoute = routeDetails();
currentRoute.name = "Organizations";
const filterTableStore = filterTable();
let organizations = ref([]);
const filters = ref([]);

const isCheckedAll = ref(false);
const checkedCheckbox = ref(false);


onMounted(async () => {
  const response = await getOrganizations();
  const { data } = response;

  var orgsData = data.data;
  orgsData = orgsData.map((x) => ({
    ...x,
    status: true ? "verified" : "not_verified",
  }));
  if (data) {
    organizations.value = orgsData;
  }

  filterTableStore.allItems = organizations.value;
});

function updateCheckbox(){
  if(document.querySelector('.checkbox:checked')){
    return checkedCheckbox.value = true
  }
  checkedCheckbox.value = false
}
</script>
