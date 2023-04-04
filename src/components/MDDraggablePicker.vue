<template>
  <MDLabel v-if="hasLabel" :id="id" :label="label" :required="required" />
  <MDError v-if="error !== ''">{{ error }}</MDError>
  <div class="flex">
    <div class="flex flex-col w-full mr-6 border border-gray-300 rounded-md p-4 bg-gray-200">
      <span>{{ availableLabel }}</span>
      <MDHelpBlock class="pb-4">Drag here to add an option</MDHelpBlock>
      <component ref="availableContainerRef" :is="'div'" class="grow" :key="containerKey">
        <div
          v-for="(item, index) of props.modelValue.available"
          :key="index"
          :data-id="item.id"
          class="p-4 mb-3 items-center bg-white shadow rounded-lg cursor-move"
          @click="assign(index)"
        >
          {{ item.name }}
        </div>
      </component>
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
    </div>

    <div class="flex flex-col w-full mr-6 border border-gray-300 rounded-md p-4 bg-gray-200">
      <span>{{ selectedLabel }}</span>
      <MDHelpBlock class="pb-4">Drag here to add an option</MDHelpBlock>
      <component ref="selectedContainerRef" :is="'div'" class="grow" :key="containerKey">
        <div
          v-for="(item, index) of props.modelValue.selected"
          :key="index"
          :data-id="item.id"
          class="p-4 mb-3 items-center bg-white shadow rounded-lg cursor-move"
          @click="remove(index)"
        >
          {{ item.name }}
        </div>
      </component>
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
    </div>
  </div>
</template>

<script setup>
  import { ref, onUnmounted, watch, computed } from 'vue';
  import Sortable from 'sortablejs';
  import MDLabel from './MDLabel.vue';
  import MDHelpBlock from './MDHelpBlock.vue';
  import MDError from './MDError.vue';

  const availableContainerRef = ref(null);
  const selectedContainerRef = ref(null);
  const availableSortable = ref(null);
  const selectedSortable = ref(null);
  const containerKey = ref(1);

  // eslint-disable-next-line no-undef
  const emit = defineEmits(['update:modelValue', 'onUpdate']);
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

  onUnmounted(() => {
    if (availableSortable.value) {
      availableSortable.value.destroy();
      availableContainerRef.value = null;
      availableSortable.value = null;
    }
    if (selectedSortable.value) {
      selectedSortable.value.destroy();
      selectedContainerRef.value = null;
      selectedSortable.value = null;
    }
  });

  watch(availableContainerRef, (newDraggable) => {
    if (newDraggable) {
      buildAvailableSortable();
    }
  });

  watch(selectedContainerRef, (newDraggable) => {
    if (newDraggable) {
      buildSelectedSortable();
    }
  });

  const buildAvailableSortable = () => {
    availableSortable.value = new Sortable(availableContainerRef.value, {
      group: 'test',
      sort: false,
      onEnd: (event) => {
        assign(event.oldIndex);
      },
    });
  };

  const buildSelectedSortable = () => {
    selectedSortable.value = new Sortable(selectedContainerRef.value, {
      group: 'test',
      sort: false,
      onEnd: (event) => {
        remove(event.oldIndex);
      },
    });
  };

  const assign = (index) => {
    const [available, selected] = getLists();
    const item = available[index];
    selected.push(item);
    available.splice(index, 1);
    updateModelValue(available, selected);
    containerKey.value++;
  };

  const remove = (index) => {
    const [available, selected] = getLists();
    const item = selected[index];
    available.push(item);
    selected.splice(index, 1);
    updateModelValue(available, selected);
    containerKey.value++;
  };

  const assignAll = () => {
    let [available, selected] = getLists();
    const allAvailable = available.concat(selected);
    selected = [...allAvailable];
    available = [];
    updateModelValue(available, selected);
    containerKey.value++;
  };

  const removeAll = () => {
    let [available, selected] = getLists();
    const allAvailable = available.concat(selected);
    selected = [];
    updateModelValue(allAvailable, selected);
    containerKey.value++;
  };

  const getLists = () => {
    return [getAvailableItems(), getSelectedItems()];
  };

  const getAvailableItems = () => {
    return [...props.modelValue.available];
  };

  const getSelectedItems = () => {
    return [...props.modelValue.selected];
  };

  const updateModelValue = (available, selected) => {
    emit('update:modelValue', {
      available: available,
      selected: selected,
    });
    emit('onUpdate');
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
