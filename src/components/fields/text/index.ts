import {computed, defineComponent, h, PropType} from "vue";
import { CSS_NAMESPACE } from "../../../constants";
import { MDInput } from "../input";

export enum MDTextTypes {
  TEXT = 'text',
  BUTTON = 'button',
  CHECKBOX = 'checkbox',
  COLOR = 'color',
  DATE = 'date',
  DATETIME = 'datetime-local',
  EMAIL = 'email',
  FILE = 'file',
  HIDDEN = 'hidden',
  IMAGE = 'image',
  MONTH = 'month',
  NUMBER = 'number',
  PASSWORD = 'password',
  RADIO = 'radio',
  RANGE = 'range',
  RESET = 'reset',
  SEARCH = 'search',
  SUBMIT = 'submit',
  TEL = 'tel',
  TIME = 'time',
  URL = 'url',
  WEEK = 'week',
}

export const MDTText = defineComponent({
  name: 'MDText',
  emits: ['update:modelValue'],
  props: {
    id: { type: String, required: true },
    modelValue: { type: [String, Number], required: true },
    label: { type: String, required: false, default: '' },
    type: { type: String as PropType<MDTextTypes>, required: false, default: MDTextTypes.TEXT },
    placeholder: { type: String, required: false, default: '' },
    describedBy: { type: String, required: false, default: '' },
    help: { type: String, required: false, default: '' },
    error: { type: String, required: false, default: '' },
    enabled: { type: Boolean, required: false, default: true },
    success: { type: Boolean, required: false, default: false },
    info: { type: Boolean, required: false, default: false },
    warning: { type: Boolean, required: false, default: false },
    required: { type: Boolean, required: false, default: false },
  },
  setup(props, { emit }) {

    const inputClass = computed(() => {
      if (props.error !== '') {
        return `${CSS_NAMESPACE}__input_error`;
      } else if (props.success) {
        return `${CSS_NAMESPACE}__input_success`;
      } else if (props.info) {
        return `${CSS_NAMESPACE}__input_info`;
      } else if (props.warning) {
        return `${CSS_NAMESPACE}__input_warning`;
      } else {
        return `${CSS_NAMESPACE}__input_`;
      }
    });

    return () => {
      return h(MDInput, {
        id: props.id,
        label: props.label,
        describedBy: props.describedBy,
        help: props.help,
        error: props.error,
        required: props.required
      }, {
        default: () => h('input', {
          id: props.id,
          type: props.type,
          'class': `${CSS_NAMESPACE}__text_field ${inputClass.value}`,
          value: props.modelValue,
          placeholder: props.placeholder,
          'aria-describedby': props.describedBy,
          disabled: !props.enabled,
          'onInput': (event: any) => {
            emit('update:modelValue', event.target.value);
          }
        })
      });
    }
  }
});