import { defineComponent, h } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import { MDInput } from "../input";
import '@vuepic/vue-datepicker/dist/main.css';

export const MDDatePicker = defineComponent({
  name: 'MDDatePicker',
  emits: ['update:modelValue'],
  props: {
    id: { type: String, required: true },
    modelValue: { type: [Date, String], required: true },
    label: { type: String, required: false, default: '' },
    describedBy: { type: String, required: false, default: '' },
    help: { type: String, required: false, default: '' },
    success: { type: Boolean, required: false, default: false },
    info: { type: Boolean, required: false, default: false },
    warning: { type: Boolean, required: false, default: false },
    error: { type: String, required: false, default: '' },
    required: { type: Boolean, required: false, default: false },
  },
  setup(props, { emit, attrs }) {
    return () => {

      console.log(attrs);

      return h(MDInput,  {
        id: props.id,
        label: props.label,
        describedBy: props.describedBy,
        help: props.help,
        error: props.error,
        required: props.required
      }, {
        default: () => h(Datepicker, {
          modelValue: props.modelValue,
          ...attrs,
          required: props.required,
          uid: props.id,
          'onUpdate:modelValue': (modelData: any) => emit('update:modelValue', modelData)
        })
      });
    }
  }
});