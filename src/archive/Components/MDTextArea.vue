<template>
  <MDInput :label="label" :id="id" :describedBy="describedBy" :help="help" :error="error" :required="required">
    <textarea
      type="text"
      class="form-control block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-solid border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      :class="{
        'border-2 border-red-600': error,
        'border-2 border-green-600': success,
        'border-2 border-blue': info,
        'border-2 border-yellow-600': warning,
      }"
      v-bind="$attrs"
      :id="id"
      :rows="rows"
      :value="modelValue"
      :placeholder="placeholder || label"
      :aria-describedby="describedBy"
      @input="updateInput"
    />
    <div v-if="hasLimit" class="flex justify-end pt-2">
      <span
        :class="{
          'text-green-600': !limitReached,
          'text-red-600': limitReached,
        }"
        >{{ modelValue.length }}/{{ limit }}</span
      >
    </div>
  </MDInput>
</template>

<script setup>
  import { computed } from 'vue';
  import MDInput from './MDInput.vue';

  // eslint-disable-next-line no-undef
  const emit = defineEmits(['update:modelValue']);
  // eslint-disable-next-line no-undef
  const props = defineProps({
    label: {
      type: String,
      default: '',
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    rows: {
      type: String,
      default: '4',
      required: false,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
      required: false,
    },
    describedBy: {
      type: String,
      default: '',
    },
    help: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    success: Boolean,
    info: Boolean,
    warning: Boolean,
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    hasLimit: {
      type: Boolean,
      default: false,
      required: false,
    },
    limit: {
      type: Number,
      default: 255,
      required: false,
    },
  });

  const limitReached = computed(() => {
    return props.modelValue.length > props.limit;
  });

  const updateInput = (event) => {
    emit('update:modelValue', event.target.value);
  };
</script>
