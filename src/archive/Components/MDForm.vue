<template>
  <div class="block p-6 rounded-lg shadow-lg bg-white">
    <form>
      <slot />
      <div
        class="flex"
        :class="{
          'justify-between': props.showCancel,
          'justify-end': !props.showCancel,
        }"
      >
        <button
          v-if="props.showCancel"
          type="button"
          class="px-6 py-2.5 bg-white text-blue font-medium text-xs leading-tight border border-sky-700 uppercase rounded shadow-md hover:bg-sky-900 hover:shadow-lg hover:text-white transition duration-150 ease-in-out"
          @click="cancel"
        >
          {{ props.cancelText }}
        </button>
        <button
          v-if="props.showSubmit"
          type="button"
          class="px-6 py-2.5 bg-sky-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-900 hover:shadow-lg transition duration-150 ease-in-out"
          @click="submit"
        >
          {{ props.submitText }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
  // eslint-disable-next-line no-undef
  const emit = defineEmits(['onCancelClicked', 'onSubmitClicked']);
  // eslint-disable-next-line no-undef
  const props = defineProps({
    showCancel: {
      type: Boolean,
      default: false,
      required: false,
    },
    showSubmit: {
      type: Boolean,
      default: true,
      required: false,
    },
    cancelText: {
      type: String,
      default: 'Cancel',
      required: false,
    },
    submitText: {
      type: String,
      default: 'Submit',
      required: false,
    },
  });

  function cancel() {
    emit('onCancelClicked');
  }

  function submit() {
    emit('onSubmitClicked');
  }
</script>
