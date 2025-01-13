import {computed, defineComponent, Fragment, h} from "vue";
import { CSS_NAMESPACE } from "../../../constants";
import { MDLabel } from "../../label";
import { MDHelp } from "../../help";
import { MDError } from "../../error";

export const MDInput = defineComponent({
  name: 'MDInput',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: false, default: '' },
    describedBy: { type: String, required: false, default: '' },
    help: { type: String, required: false, default: '' },
    error: { type: String, required: false, default: '' },
    required: { type: Boolean, required: false, default: false },
  },
  setup(props, { slots }) {
    const hasLabel = computed(() => props.label !== '' );
    const hasHelp = computed(() => props.help !== '' );
    const hasError = computed(() => props.error !== '' );

    return () => {

      const children: any[] = [];

      // Add label if present
      if (hasLabel.value) {
        children.push(
          h(MDLabel, {
            id: props.id,
            label: props.label,
            required: props.required
          })
        );
      }

      // Add the content slot
      children.push(h('div', {
        'class': 'display: flex;'
      }, { default: () => slots }));

      // Add any help data if present
      if (hasHelp.value) {
        children.push(
          h(MDHelp, {
            id: props.describedBy
          }, { default: () => props.help })
        );
      }

      if (hasError.value) {
        children.push(
          h(MDError, null, { default: () => props.error })
        );
      }

      return h('div', {
        'class': `${CSS_NAMESPACE}__input_wrapper`,
      }, children);

    }
  }
});