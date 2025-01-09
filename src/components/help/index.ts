import { defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const MDHelp = defineComponent({
  name: 'MDHelp',
  setup(props, { slots }) {
    return () => {
      return h('span', {
        'class': `${CSS_NAMESPACE}__help`
      }, {
        default: () => slots
      });
    }
  }
});