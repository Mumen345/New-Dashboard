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
               <input type="checkbox" @click="selectAll" />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Domain Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="organisation in orgsData" :key="organisation.id">
            <td>
               <input type="checkbox" class="checkbox" :checked="isCheckedAll" @click="updateCheckbox(organisation.id)" />
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
import { ref, onMounted, computed, onUnmounted } from "vue";
import { routeDetails } from "@/stores/routeDetails.js";
import { filterTable } from "@/stores/search-filter";
import ActionComponent from "@/components/reusables/ActionComponent.vue";
import { getOrganizations } from "@/apis/accountApi";
import { useSearchKeyword } from "../../stores/useSearchKeyword";
import { storeToRefs } from "pinia";

// store
const store = useSearchKeyword();
const { search } = storeToRefs(store);

const currentRoute = routeDetails();
currentRoute.name = "Organizations";
const filterTableStore = filterTable();
let organizations = ref([]);

const isCheckedAll = ref(false);
const checkedCheckbox = ref(false);



// check ids
const selectedIds = ref([]);

const isSelected = (id) => {
  return selectedIds.value.includes(id);
};

const toggleSelection = (id) => {
  if (isSelected(id)) {
    // Remove the id from the array
    const index = selectedIds.value.indexOf(id);
    selectedIds.value.splice(index, 1);
  } else {
    // Add the id to the array
    selectedIds.value.push(id);
  }
};

function updateCheckbox(id) {
  // Toggle selection here
  toggleSelection(id);

  if (document.querySelector(".checkbox:checked")) {
    return (checkedCheckbox.value = true);
  }
  checkedCheckbox.value = false;
}

function selectAll(){
  isCheckedAll.value = !isCheckedAll.value
  if(selectedIds.value.length > 0){
    selectedIds.value.splice(0, selectedIds.value.length);
  } else{
    selectedIds.value = orgsData.value.map(item => item.id);
  }
  
}


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

const orgsData = computed(() => {
  if (search.value.length > 0) {
    return organizations.value.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.value.toLowerCase())
      )
    );
  }
  return organizations.value;
});

onUnmounted(() => {
    search.value = "";
  });


</script>
