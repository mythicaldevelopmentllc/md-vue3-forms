<template>
  <label v-if="hasLabel" :for="props.id" class="form-label inline-block mb-2 text-gray-700">
    {{ label }}
    <span v-if="required" class="text-red-500">*</span>
  </label>
  <div
    ref="dropZoneRef"
    class="border border-2 border-gray-600 flex justify-center items-center w-full h-48 cursor-pointer"
  >
    <p v-if="isOverDropZone">{{ props.hoverText }}</p>
    <p v-else>{{ props.helpText }}</p>
  </div>
  <div v-if="showPreview" class="flex justify-start mt-10">
    <div v-for="(file, index) in modelValue" :key="file.name" class="w-24 h24 mr-10">
      <div class="flex flex-col items-center baseline h-full place-content-end">
        <img :src="file.preview" alt="file.file.name" class="mb-2.5" />
        <button
          type="button"
          class="cursor-pointer font-normal text-fs20 opacity-80 hover:opacity-100"
          @click="handleOnAction(index)"
        >
          <TrashIcon class="text-red-600 w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useDropZone } from '@vueuse/core';
  import { TrashIcon } from '@heroicons/vue/24/outline';
  import Swal from 'sweetalert2';

  const dropZoneRef = ref(null);

  // eslint-disable-next-line no-undef
  const emit = defineEmits(['update:modelValue', 'onDrop']);
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
    showPreview: {
      type: Boolean,
      default: true,
      required: false,
    },
    helpText: {
      type: String,
      default: 'Drag and drop some files here, or click to select files',
      required: false,
    },
    hoverText: {
      type: String,
      default: 'Drop the files here ...',
      required: false,
    },
    modelValue: {
      type: [Array],
      default: () => {
        return [];
      },
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    showConfirmation: {
      type: Boolean,
      default: true,
      required: false,
    },
    confirmationConfig: {
      type: Object,
      default: () => {
        return {
          title: '',
          text: 'Are you sure?',
          icon: 'warning',
          showCancel: true,
          button: {
            color: '#3085d6',
            text: 'OK',
          },
        };
      },
      required: false,
    },
  });

  const onDrop = (files) => {
    let values = props.modelValue;
    values.push({
      preview: URL.createObjectURL(files[0]),
      file: files[0],
    });
    emit('update:modelValue', values);
    emit('onDrop');
  };
  const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

  const removeImage = (index) => {
    let values = props.modelValue;
    values.splice(index, 1);
    emit('update:modelValue', values);
  };

  const hasLabel = computed(() => {
    return props.label !== '';
  });

  const handleOnAction = (index) => {
    if (props.showConfirmation) {
      Swal.fire({
        title: props.confirmationConfig.title,
        text: props.confirmationConfig.text,
        icon: props.confirmationConfig.icon,
        showCancelButton: props.confirmationConfig.showCancel,
        confirmButtonColor: props.confirmationConfig.button?.color,
        confirmButtonText: props.confirmationConfig.button?.text,
      }).then((result) => {
        if (result.value) {
          removeImage(index);
        }
      });
    } else {
      removeImage(index);
    }
  };
</script>
