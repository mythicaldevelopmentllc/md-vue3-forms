<template>
  <MDInput :label="label" :id="id" :describedBy="describedBy" :help="help" :error="error" :required="required">
    <div class="relative w-full">
      <Combobox :modelValue="modelValue" @update:modelValue="selectOption" by="label">
        <div class="relative mt-1">
          <div
            class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 border border-gray-300 sm:text-sm"
          >
            <ComboboxInput
              class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-lg"
              :displayValue="(option) => selectedOptionDisplay(option)"
              @change="state.query = $event.target.value"
            />

            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
            </ComboboxButton>
          </div>

          <TransitionRoot
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-100"
            >
              <div
                v-if="filteredOptions.length === 0 && query !== ''"
                class="relative cursor-default select-none py-2 px-4 text-gray-700"
              >
                Nothing Found
              </div>

              <ComboboxOption
                v-for="option in filteredOptions"
                as="template"
                :key="option.value"
                :value="option"
                v-slot="{ selected, active }"
              >
                <li
                  class="relative cursor-default select-none py-2 pl-10 pr-4"
                  :class="{
                    'bg-teal-600 text-white': active,
                    'text-gray-900': !active,
                  }"
                >
                  <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                    {{ option.label }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{ 'text-white': active, 'text-teal-600': !active }"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
    </div>
  </MDInput>
</template>

<script setup>
  import { reactive, computed } from 'vue';

  import MDInput from './MDInput.vue';
  import {
    Combobox,
    ComboboxOptions,
    ComboboxOption,
    ComboboxInput,
    ComboboxButton,
    TransitionRoot,
  } from '@headlessui/vue';
  import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/20/solid';

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
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      required: true,
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
  });

  const state = reactive({
    showOptions: false,
    query: '',
  });

  function updateInput(event) {
    emit('update:modelValue', event.target.value);
  }

  function showOptionsAction() {
    state.showOptions = true;
  }

  function selectOption(event) {
    emit('update:modelValue', event.value);
    state.showOptions = false;
  }

  const selectedOptionDisplay = (value) => {
    let display = value;
    props.options.forEach((option) => {
      if (option.value === value) {
        display = option.label;
      }
    });
    return display;
  };

  const filteredOptions = computed(() => {
    let value =
      state.query === ''
        ? props.options
        : props.options.filter((option) => {
            console.log(state.query);
            return `${option.value}-${option.label}`
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(state.query.toLowerCase().replace(/\s+/g, ''));
          });
    console.log(value);
    return value;
  });
</script>
