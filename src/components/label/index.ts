import {defineComponent, h, PropType} from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const MDLabel = defineComponent({
  name: 'MDLabel',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    required: { type: Boolean, required: false, default: false },
  },
  setup(props) {
    return () => {

      const children: any[] = [props.label];
      if (props.required) {
        children.push(
          h('span', {
            'class': `${CSS_NAMESPACE}__required`,
          }, '*')
        );
      }

      return h('label', {
        'for': props.id,
        'class': `${CSS_NAMESPACE}__label`
      }, children)
    }
  }
});