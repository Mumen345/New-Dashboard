<template>
  <div class="flex items-center rounded border bg-white p-3 md:p-5">
    <div class="relative grow">
      <input
        type="search"
        id="search"
        placeholder="Search"
        class="form-control rounded"
        autocomplete="current-text"
        v-model.lazy="filterTableStore.input"
        @keyup.enter="filterTableStore.searchUsers"
      />
    </div>

    <div class="static ml-3">
      <div v-if="checkBoxIsClicked || showAction">
        <a
          class="relative flex items-center rounded border px-3 py-3"
          id="droplk"
          data-dropdown-toggle="dropdown"
          data-popper-placement="bottom-end"
          @click="onClick"
        >
          <span
            class="pointer-events-none mr-2.5 hidden text-sm font-normal md:block"
            >Actions</span
          >
          <SortIcon class="pointer-events-none" />
        </a>
        <div
          class="dropdown-menu z-10 hidden w-48 rounded border border-neutral-200 bg-white py-4 shadow-xl"
        >
          <ul>
            <li class="px-2 py-1 hover:bg-slate-50"><button>View</button></li>
            <li class="px-2 py-1 hover:bg-slate-50"><button>Delete</button></li>
          </ul>
        </div>
      </div>
      <div v-else>
        <a
          class="relative flex cursor-not-allowed items-center rounded border px-3 py-3 text-gray-200"
          id="droplk"
          data-dropdown-toggle="dropdown"
          data-popper-placement="bottom-end"
          @click="onClick"
        >
          <span
            class="pointer-events-none mr-2.5 hidden text-sm font-normal md:block"
            >Actions</span
          >
          <SortIcon class="pointer-events-none" />
        </a>
      </div>
    </div>

    <div class="static ml-3">
      <a
        class="relative flex items-center rounded border px-3 py-3"
        id="droplk"
        data-dropdown-toggle="dropdown"
        data-popper-placement="bottom-end"
      >
        <FilterIcon class="pointer-events-none text-neutral-400" />
        <span
          class="pointer-events-none ml-2 hidden text-sm font-normal text-black md:block"
          >Filter</span
        >
      </a>
      <div
        class="dropdown-menu z-10 hidden w-48 rounded border border-neutral-200 bg-white pt-4 pb-7 shadow-xl"
      >
        <div class="flex flex-col justify-between gap-4">
          <div class="items">
            <list-item checked="asc" class="cursor-pointer">
              <div class="content flex gap-2">
                <input type="checkbox" /> Filter 1
              </div>
            </list-item>
            <list-item checked="asc" class="cursor-pointer">
              <div class="content flex gap-2">
                <input type="checkbox" /> Filter 1
              </div>
            </list-item>
            <list-item checked="asc" class="cursor-pointer">
              <div class="content flex gap-2">
                <input type="checkbox" /> Filter 1
              </div>
            </list-item>
          </div>

          <div class="button px-5 text-white">
            <button class="w-full rounded-lg bg-brand p-2">Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SortIcon from "../icons/SortIcon.vue";
import FilterIcon from "../icons/FilterIcon.vue";
import { filterTable } from "@/stores/search-filter";
import ListItem from "@/components/ListItem.vue";
const filterTableStore = filterTable();

defineProps({
  showAction: Boolean,
  checkBoxIsClicked: Boolean,
});
</script>
