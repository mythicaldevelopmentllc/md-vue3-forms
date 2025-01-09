import { defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const MDError = defineComponent({
  name: 'MDError',
  setup(props, { slots }) {
    return () => {
      return h('span', {
        'class': `${CSS_NAMESPACE}__error`
      }, {
        default: () => slots
      });
    }
  }
});