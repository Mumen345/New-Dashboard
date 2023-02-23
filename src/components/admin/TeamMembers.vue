<template>
  <div
    class="container flex h-fit w-full flex-col justify-start rounded bg-white p-3 font-semibold"
  >
    <div
      class="flex h-[5.4rem] w-[6.16rem] items-center justify-center rounded-2xl bg-orange-100"
    >
      <TeamMembersIcon />
    </div>
    <h2 class="my-8 text-[1.4rem] font-medium text-dark">Team Members</h2>
   <h2 class="text-[1.4rem]">
      <span class="text-[2.6rem]">{{ teamMembers }}</span> Members
    </h2>
  </div>
</template>

<script setup>
import TeamMembersIcon from "../icons/TeamMembersIcon.vue";
defineProps({
  teamMembers: {
    type: Number,
    default: 86,
  },
});
</script>

<style lang="scss" scoped></style>
