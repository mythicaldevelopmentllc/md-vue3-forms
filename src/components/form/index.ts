import { computed, defineComponent, h } from 'vue';
import { CSS_NAMESPACE } from '../../constants';

export const MDForm = defineComponent({
  name: 'MDForm',
  emits: ['onCancel', 'onSubmit'],
  props: {
    showCancel: { type: Boolean, required: false, default: false },
    showSubmit: { type: Boolean, required: false, default: true },
    cancelText: { type: String, required: false, default: 'Cancel' },
    submitText: { type: String, required: false, default: 'Submit' },
  },
  setup(props, { emit, slots }) {
    const buttonWrapperStyle = computed(() => {
      if (props.showCancel) {
        return 'justify-content: space-between;'
      } else {
        return 'justify-content: flex-end;';
      }
    });

    return () => {

      const buttons = [];
      if (props.showCancel) {
        buttons.push(
          h('button', {
            'type': 'button',
            'class': `${CSS_NAMESPACE}__btn ${CSS_NAMESPACE}__btn_cancel`,
            'onClick': () => emit('onCancel')
          }, props.cancelText)
        );
      }
      if (props.showSubmit) {
        buttons.push(
          h('button', {
            'type': 'button',
            'class': `${CSS_NAMESPACE}__btn ${CSS_NAMESPACE}__btn_success`,
            'onClick': () => emit('onSubmit')
          }, props.submitText)
        );
      }

      return h(
        'div',
        {
          class: `${CSS_NAMESPACE}__Wrapper`,
        },
        h('form', [
          h('div', null, { default: () => slots }),
          h('div', {
            'style': `display: flex; ${buttonWrapperStyle.value}`
          },buttons),
        ]),
      );
    };
  },
});
