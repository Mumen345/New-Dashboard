<template>
  <div class="flex h-[14rem] items-center justify-between">
    <div class="ml-[3rem]">
      <h1 class="m-4 block text-[2.4rem] font-bold text-brand-dark">
        Welcome Back
      </h1>
    </div>

    <div class="relative">
      <input
        type="text"
        name=""
        id=""
        v-model="search"
        @focus="removeSearchIcon = true"
        :class="removeSearchIcon ? 'placeholder:pl-0' : 'placeholder:pl-12'"
        @mouseout="removeSearchIcon = false"
        class="container mr-[4.9rem] block h-[4.5rem] w-[48.65rem] rounded-xl border-none text-xl placeholder:text-xl placeholder:capitalize placeholder:text-dark"
        placeholder=""
      />
      <span
        class="material-icons absolute top-5 left-4 block text-brand"
        style="font-size: 2rem"
        v-if="!removeSearchIcon && search == ''"
        >search</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const search = ref("");
const removeSearchIcon = ref(false);
</script>

<style lang="scss" scoped></style>
