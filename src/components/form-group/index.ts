import { computed, defineComponent, h } from 'vue';
import { CSS_NAMESPACE } from '../../constants';

export const MDGroup = defineComponent({
  name: 'MDGroup',
  setup(_, { slots }) {
    return () => {
      return h('div', {
        'class': `${CSS_NAMESPACE}__form_group`
      }, {
        default: () => slots
      });
    }
  }
});