import { defineComponent, PropType, VNode, h } from "vue";
import { CSS_NAMESPACE } from "../../../constants";
import { MDLabel } from "../../label";
import { MDError } from "../../error";
import { ItemClickData, ListMoveData, MDList } from "./list";

export type DraggableOption = {
  id: string,
  label?: string|undefined,
  data: any
}
export type DraggableOptions = DraggableOption[];
export type DraggableList = {
  label?: string|undefined,
  items: DraggableOptions
};
export type DraggableLists = DraggableList[];

const buildLists = (lists: DraggableLists, moveCallback: Function, clickCallback: Function): VNode[] => {
  const nodes: VNode[] = [];

  lists.forEach((list, idx) => {
    nodes.push(
      h(MDList, {
        listId: `list-${idx}`,
        label: list.label ?? '',
        sortableRef: `list-${idx}`,
        items: list.items,
        'onItemMove': (data: ListMoveData) => moveCallback(data),
        'onItemClick': (data: ItemClickData) => clickCallback(data)
      })
    );
  })
  return nodes;
}

const updateLists = (lists: DraggableLists, data: ListMoveData): DraggableLists => {
  const listCopy: DraggableLists = [...lists];
  // Grab the item from the FROM list
  const item = listCopy[data.from.list].items.splice(data.from.idx, 1);
  // Insert into the TO list
  listCopy[data.to.list].items.splice(data.to.idx, 0, item[0]);
  return listCopy;
}

export const MDDraggablePicker = defineComponent({
  name: 'MDDraggablePicker',
  emits: ['update:modelValue', 'onDropEnd', 'onClickEnd'],
  props: {
    id: { type: String, required: true },
    modelValue: { type: Object as PropType<DraggableLists>, required: true },
    label: { type: String, required: false, default: ''},
    error: { type: String, required: false, default: '' },
    required: { type: Boolean, required: false, default: false },
  },
  setup(props, { emit }) {

    return () => {

      const onMoveEnd = (data: ListMoveData) => {
        const updatedLists = updateLists(props.modelValue, data);
        emit('update:modelValue', updatedLists);
        emit('onDropEnd');
      }
      const onClickEnd = (data: ItemClickData) => {
        emit('onClickEnd', data)
      }

      const listData = buildLists(props.modelValue, onMoveEnd, onClickEnd);

      // Output array
      const elements: VNode[] = [];

      // Add a label if needed.
      if (props.label !== '') {
        elements.push(
          h(MDLabel, {
            id: props.id,
            label: props.label,
            required: props.required,
          })
        );
      }

      // Add an error if needed.
      if (props.error !== '') {
        elements.push(
          h(MDError, null, {
            default: () => props.error
          })
        );
      }

      // The main list content
      elements.push(
        h('div', {
          'class': `${CSS_NAMESPACE}__draggable_wrapper`
        }, listData)
      );

      return elements;
    }

  }
});
