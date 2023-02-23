<template>
  <div class="h-1/2 w-full rounded-lg bg-white p-4">
    <div class="mt-4 mb-12 flex items-center justify-between">
      <!-- Heading -->
      <h2 class="m-5 text-[2.4rem] font-bold">Overview</h2>
      <div class="flex h-16 w-72 gap-x-2 bg-brand-light">
        <ButtonComponent
          v-for="(component, index) in ChartButtons"
          :key="index"
          :text="component.name"
          :customStyle="
            isSelected === component.name
              ? 'background-color:#404040; font-weight: 500 ; color:#FFF'
              : 'background-color:#F3F2F2; font-weight: 500 ; color:#222222'
          "
          @click="isSelected = component.name"
        />
      </div>
    </div>
    <!-- Counts -->
    <div class="my-20 flex justify-around">
      <h2
        class="flex flex-col items-center justify-center"
        v-for="({ title, count }, index) in chartCount"
        :key="index"
      >
        <h2 class="text-[1.97rem] font-medium">{{ title }}</h2>
        <h2 class="text-[3.7rem] font-medium">{{ count }}</h2>
      </h2>
    </div>
    <!-- Charts Container -->
    <div class="relative">
      <VueApexCharts :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import ButtonComponent from "../reusables/ButtonComponent.vue";

import { ref } from "vue";
const ChartButtons = ref([
  { name: "Weekly", isSelected: false },
  { name: "Monthly", isSelected: true },
]);
const isSelected = ref("Monthly");
const toolTip = ref({});
const props = defineProps({
  categories: {
    type: Object,
    required: true,
  },
  series: {
    type: Object,
    required: true,
  },
});
const chartCount = ref([
  { title: "Views", count: 400 },
  { title: "Visits", count: 974 },
  { title: "Downloads", count: 1986 },
]);
const chartOptions = ref({
  chart: {
    type: "area",
    name: "Date",
    height: 350,
    background: "fff",
    zoom: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
    },
    tooltip: toolTip.value,
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "date-time",
    categories: props.categories,
  },
});
</script>

<style lang="scss" scoped></style>
