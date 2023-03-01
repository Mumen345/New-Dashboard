<script setup>

const props = defineProps({
   modelValue: [String, Boolean],
   checked: [String, Boolean],
   unchecked: {
      type: String,
      default: ""
   }
})

const emits = defineEmits(['update:modelValue', 'check'])

const handle = (event) => {
   if (props.checked != props.modelValue) {
      emits('update:modelValue', props.checked)
      emits('check')
      return;
   }

   if (props.checked == props.modelValue) {
      emits('update:modelValue', props.unchecked)
      emits('check')
      return
   }
}
</script>

<template>
   <a @click="handle" :class="{'bg-neutral-100': modelValue == checked}" class="block text-sm w-full hover:bg-neutral-100 px-5 py-2">
      <slot />
   </a>
</template>

