import { computed, defineComponent, h } from 'vue';
import { CSS_NAMESPACE } from '../../constants';

export const MDFormGroup = defineComponent({
  name: 'MDFormGroup',
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