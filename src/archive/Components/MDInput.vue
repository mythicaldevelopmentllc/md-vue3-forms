<template>
  <div class="my-6">
    <MDLabel v-if="hasLabel" :id="id" :label="label" :required="required" />
    <slot />
    <MDHelpBlock v-if="help" :id="describedBy">{{ help }}</MDHelpBlock>
    <MDError>{{ error }}</MDError>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  import MDLabel from './MDLabel.vue';
  import MDError from './MDError.vue';
  import MDHelpBlock from './MDHelpBlock.vue';

  // eslint-disable-next-line no-undef
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    label: {
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
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
  });

  const hasLabel = computed(() => {
    return props.label !== '';
  });
</script>
