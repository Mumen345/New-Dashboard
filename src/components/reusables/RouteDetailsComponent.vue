<template>
   <div class="flex items-center py-7">
      <h1 class="block text-xl font-bold text-brand-dark">
         {{ current.name }}
      </h1>
   </div>
</template>

<script setup>
import { routeDetails } from "@/stores/routeDetails.js";
const current = routeDetails();
</script>