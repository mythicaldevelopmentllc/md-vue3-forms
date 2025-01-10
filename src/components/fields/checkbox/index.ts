import { computed, defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../../constants";
import {CheckIcon} from "../../../icons/check-icon";

export const MDCheckbox = defineComponent({
  name: 'MDCheckbox',
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Boolean, required: true },
  },
  setup(props, { emit }) {
    const checkboxClass = computed(() => {
      if (props.modelValue) {
        return `${CSS_NAMESPACE}__checkbox_checked`
      } else {
        return `${CSS_NAMESPACE}__checkbox_not_checked`
      }
    })

    return () => {
      return h('div', {
        'class': `${CSS_NAMESPACE}__checkbox ${checkboxClass.value}`,
        'onClick': () => emit('update:modelValue', !props.modelValue)
      },
        props.modelValue ? h(CheckIcon) : '',
      );
    }
  }
});