<template>
  <div
    class="w-6 h-6"
    :class="{
      'border border-gray-300 bg-gray-100 hover:bg-gray-200': !props.isChecked,
      'border-2 border-darkblue text-green-500': props.isChecked,
    }"
    @click="selected"
  >
    <CheckIcon v-if="props.isChecked" class="-ml-0.5 -mt-0.5" />
  </div>
</template>

<script setup>
  import { CheckIcon } from '@heroicons/vue/24/outline';

  // eslint-disable-next-line no-undef
  const emit = defineEmits(['selected']);
  // eslint-disable-next-line no-undef
  const props = defineProps({
    isChecked: {
      type: Boolean,
      default: false,
      required: true,
    },
  });

  const selected = () => {
    emit('selected');
  };
</script>
