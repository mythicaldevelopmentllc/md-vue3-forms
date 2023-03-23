<template>
  <MDLabel v-if="hasLabel" :id="id" :label="label" :required="required" />
  <MDError v-if="error !== ''">{{ error }}</MDError>
  <div class="flex">
    <div class="w-full mr-6 border border-gray-300 rounded-md p-4 bg-gray-200">
      <span>{{ availableLabel }}</span>
      <Draggable
        group="draggableOption"
        :list="props.modelValue.available"
        itemKey="id"
        :animation="200"
        @end="onEnd"
        ghostClass="moving-card"
      >
        <template #header>
          <MDHelpBlock class="pb-4">Drag here to remove an option</MDHelpBlock>
        </template>

        <template #item="{ element, index }">
          <div class="p-4 mb-3 items-center bg-white shadow rounded-lg cursor-move" @click="assign(index)">
            {{ element.name }}
          </div>
        </template>

        <template #footer>
          <div class="flex justify-end">
            <button
              v-if="props.modelValue.available.length > 0"
              type="button"
              class="px-6 py-2.5 bg-sky-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-900 hover:shadow-lg transition duration-150 ease-in-out"
              @click="assignAll"
            >
              Assign All
            </button>
          </div>
        </template>
      </Draggable>
    </div>

    <div class="w-full mr-6 border border-gray-300 rounded-md p-4 bg-gray-200">
      <span>{{ selectedLabel }}</span>
      <Draggable
        group="draggableOption"
        :list="props.modelValue.selected"
        itemKey="id"
        :animation="200"
        @end="onEnd"
        ghostClass="moving-card"
      >
        <template #header>
          <MDHelpBlock class="pb-4">Drag here to select an option</MDHelpBlock>
        </template>

        <template #item="{ element, index }">
          <div class="p-4 mb-3 items-center bg-white shadow rounded-lg cursor-move" @click="remove(index)">
            {{ element.name }}
          </div>
        </template>

        <template #footer>
          <div class="flex justify-end">
            <button
              v-if="props.modelValue.selected.length > 0"
              type="button"
              class="px-6 py-2.5 bg-sky-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-900 hover:shadow-lg transition duration-150 ease-in-out"
              @click="removeAll"
            >
              Remove All
            </button>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import Draggable from 'vuedraggable';
  import MDLabel from './MDLabel.vue';
  import MDHelpBlock from './MDHelpBlock.vue';
  import MDError from './MDError.vue';

  // eslint-disable-next-line no-undef
  const emit = defineEmits(['onDragComplete', 'onAllAssigned', 'onAllRemoved']);
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
    availableLabel: {
      type: String,
      default: '',
      required: true,
    },
    selectedLabel: {
      type: String,
      default: '',
      required: true,
    },
    modelValue: {
      type: Object,
      default: () => {
        return {
          available: [],
          selected: [],
        };
      },
    },
    error: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
  });

  const assign = (index) => {
    const company = props.modelValue.available[index];
    props.modelValue.selected.push(company);
    props.modelValue.available.splice(index, 1);
    emit('onDragComplete');
  };

  const remove = (index) => {
    const company = props.modelValue.selected[index];
    props.modelValue.available.push(company);
    props.modelValue.selected.splice(index, 1);
    emit('onDragComplete');
  };

  const assignAll = () => {
    // Move all back to available if any.
    removeAll();
    // Make all available assigned and clear the available list.
    props.modelValue.selected = props.modelValue.available;
    props.modelValue.available = [];
    emit('onAllAssigned');
  };

  const removeAll = () => {
    props.modelValue.selected.forEach((company) => {
      props.modelValue.available.push(company);
    });
    props.modelValue.selected = [];
    emit('onAllRemoved');
  };

  const onEnd = () => {
    emit('onDragComplete');
  };

  const hasLabel = computed(() => {
    return props.label !== '';
  });
</script>

<style scoped lang="scss">
  .moving-card {
    @apply opacity-50 bg-gray-100 border border-blue-400;
  }
</style>
