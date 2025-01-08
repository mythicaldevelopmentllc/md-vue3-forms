<template>
  <MDInput
    :label="props.label"
    :id="props.id"
    :describedBy="props.describedBy"
    :help="props.help"
    :error="props.error"
    :required="props.required"
  >
    <input
      :type="props.type"
      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      :class="{
        'border-2 border-red-600': props.error,
        'border-2 border-green-600': props.success,
        'border-2 border-blue': props.info,
        'border-2 border-yellow-600': props.warning,
      }"
      v-bind="$attrs"
      :id="props.id"
      :value="modelValue"
      :placeholder="props.placeholder || props.label"
      :aria-describedby="props.describedBy"
      @input="updateInput"
      :disabled="!props.enabled"
    />
  </MDInput>
</template>

<script setup>
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
    type: {
      type: String,
      required: false,
      default: 'text',
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
    enabled: {
      type: Boolean,
      default: true,
      required: false,
    },
    success: Boolean,
    info: Boolean,
    warning: Boolean,
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
  });

  function updateInput(event) {
    emit('update:modelValue', event.target.value);
  }
</script>
