<template>
  <MDInput
    :label="props.label"
    :id="props.id"
    :describedBy="props.describedBy"
    :help="props.help"
    :error="props.error"
    :required="props.required"
  >
    <VueDatePicker
      class="w-full"
      v-model="state.date"
      :format="format"
      :enableTimePicker="enableTimePicker"
      autoApply
      @update:modelValue="updateInput"
    />
  </MDInput>
</template>

<script setup>
  import { reactive } from 'vue';
  import MDInput from './MDInput.vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

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
    modelValue: {
      type: Date,
      default: () => {
        return new Date();
      },
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
    enableTimePicker: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: 'MM/dd/yyyy',
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

  const state = reactive({
    date: props.modelValue,
  });

  function updateInput(modelData) {
    emit('update:modelValue', modelData);
  }
</script>
