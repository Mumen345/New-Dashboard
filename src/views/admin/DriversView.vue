<template>
  <div class="mb-4">
    <ActionComponent
      :showAction="isCheckedAll"
      :checkBoxIsClicked="checkedCheckbox"
    />

    <div
      class="mt-7 mb-8 overflow-x-auto rounded border bg-white px-0 sm:py-3 sm:px-3"
    >
      <table class="table" id="table" width="100%">
        <thead class="thead-light">
          <tr class="uppercase">
            <th>
              <input type="checkbox" @click="isCheckedAll = !isCheckedAll" />
            </th>
            <th>UserId</th>
            <th>License</th>
            <th>Insurance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="driver in drivers" :key="driver.id">
            <td>
              <input
                type="checkbox"
                class="checkbox"
                :checked="isCheckedAll"
                @click="updateCheckbox"
              />
            </td>
            <td>{{ driver.user_id }}</td>
            <td>{{ driver.license }}</td>
            <td>{{ driver.insurance }}</td>
            <td>
              <span
                :class="useStatusStyle(driver.verified)"
                class="flex w-32 items-center justify-center rounded p-2 capitalize text-white"
              >
                {{ useStatusContent(driver.verified) }}</span
              >
            </td>
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
import { routeDetails } from "@/stores/routeDetails.js";
import { filterTable } from "@/stores/search-filter";
import { ref, onMounted } from "vue";
import ActionComponent from "@/components/reusables/ActionComponent.vue";
import { getDrivers } from "@/apis/accountApi";
import { useStatusStyle } from "@/composables/useStatusStyle";
import { useStatusContent } from "@/composables/useStatusContent";

// store
const currentRoute = routeDetails();
currentRoute.name = "Drivers";
const filterTableStore = filterTable();

const isCheckedAll = ref(false);
const checkedCheckbox = ref(false);

const drivers = ref([]);

onMounted(async () => {
  const { data } = await getDrivers();
  if (data) drivers.value = data.data;
  filterTableStore.allItems = drivers.value;
});



function updateCheckbox() {
  if (document.querySelector(".checkbox:checked")) {
    return (checkedCheckbox.value = true);
  }
  checkedCheckbox.value = false;
}
</script>
