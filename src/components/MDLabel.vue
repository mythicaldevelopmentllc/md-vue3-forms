<template>
  <label :for="props.id" class="form-label inline-block mb-2 text-gray-700">
    {{ label }}
    <span v-if="required" class="text-red-500">*</span>
  </label>
</template>

<script setup>
  // eslint-disable-next-line no-undef
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
  });
</script>
