import {
  defineComponent,
  h,
  onMounted,
  PropType,
  type Ref,
  ref
} from "vue";
import { CSS_NAMESPACE } from "../../../constants";
import { MDHelp } from "../../help";
import { DraggableOptions } from "./index";
import Sortable from "sortablejs";

const HELP_TEXT = 'Drag here to add an option';
export type ListMoveData = {
  to: {
    list: number,
    idx: number
  },
  from: {
    list: number,
    idx: number,
  }
}

export type ItemClickData = {
  list: number,
  idx: number
}

export const MDList = defineComponent({
  name: 'MDList',
  emits: ['itemMove', 'itemClick'],
  props: {
    listId: { type: String, required: true },
    label: { type: String, required: false, default: '' },
    sortableRef: { type: String, required: true },
    items: { type: Array as PropType<DraggableOptions>, required: true },
  },
  setup(props, { emit }) {

    const containerKey = ref(1);
    const listEl: Ref<HTMLElement | null> = ref(null);
    const sortable: Ref<Sortable | null> = ref(null);

    const getListId = (list: string): number => {
      return parseInt(list.split('-')[1]);
    }

    onMounted(() => {

      if (listEl.value != null) {
        sortable.value = new Sortable(listEl.value, {
          group: 'test',
          sort: false,
          onEnd: (event) => {
            const fromList = getListId(event.from.id); // parseInt(event.from.id.split('-')[1]);
            const toList = getListId(event.to.id); // .split('-')[1]);
            const data: ListMoveData = {
              to: {
                list: toList,
                idx: event.newIndex ?? 0
              },
              from: {
                list: fromList,
                idx: event.oldIndex ?? 0
              }
            }
            emit('itemMove', data)
          }
        });
      }
    });

    return () => {

      return h('div', {
        'class': `${CSS_NAMESPACE}__draggable_list_wrapper`
      }, [
        h('span', props.label),
        h(MDHelp, {
          style: 'padding: 1rem;'
        }, { default: () => HELP_TEXT }),
        h('div', {
          id: props.listId,
          key: containerKey.value,
          ref: listEl,
        },
        props.items.map((item, idx) => {
          return h('div', {
            key: idx,
            'class': `${CSS_NAMESPACE}__draggable_list_item`,
            'data-id': item.id,
            'onClick': () => {
              emit('itemClick', {
                list: getListId(props.listId),
                idx: idx,
              });
            }
          }, item.label)
        })
        ),
      ]);
    }
  }
});
