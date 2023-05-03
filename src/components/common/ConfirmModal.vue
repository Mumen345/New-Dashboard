<script setup>
defineProps({
   hidden: Boolean,
   toggle: {
      type: Boolean,
      default: true
   }
});
</script>

<template>
   <div id="popup-modal" tabindex="-1" :class="hidden ? 'flex' : 'hidden'" class="modal-backdrop overflow-y-auto overflow-x-hidden fixed inset-0 z-[500] h-full items-center">
      <div class="relative p-4 w-full max-w-md mx-auto h-auto wb-scroll-sm scroll-sm">
         <div class="relative bg-white rounded-lg shadow">
            <button v-if="toggle" type="button"
               class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" @click="$emit('close')">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg text-base" viewBox="0 0 16 16">
                  <path
                     d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
               </svg>
            </button>
            <div class="py-7 px-4 sm:px-6 text-center">
               <slot />
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.modal-backdrop {
   background: rgba(0, 0, 0, 0.5);
}

.modal {
   position: relative;
   max-height: calc(100% - 3rem);
   margin-top: 1.5rem;
   margin-bottom: 1.5rem;
}
</style>