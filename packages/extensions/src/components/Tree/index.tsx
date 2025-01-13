import { computed, defineComponent, provide, ref } from "vue";
import TreeNodes from "./TreeNodes.vue";
import { IEditorElement } from "@cgx-designer/core";

const CTree = defineComponent({
  inheritAttrs: false,
  emits: ["nodeClick", "update:selectedKey", "update:elementList"],
  props: {
    selectedKey: {
      type: String,
    },
    elementList: {
      type: Array<IEditorElement>,
      default: () => [],
    },
  },
  setup(props, { slots, emit }) {
    const expandedKeys = ref<string[]>([]);
    const handleSelect = (id: string, elementSchema: IEditorElement) => {
      localSelectedKey.value = id;
      emit("nodeClick", { id, elementSchema });
    };

    const registerExpandedKeys = (id: string) => {
      if (!expandedKeys.value.includes(id)) {
        expandedKeys.value.push(id);
      }
    };

    const localTreeData = computed({
      get() {
        return props.elementList;
      },
      set(e) {
        emit("update:elementList", e);
      },
    });

    const localSelectedKey = computed({
      get() {
        return props.selectedKey;
      },
      set(value) {
        emit("update:selectedKey", value);
      },
    });

    provide("slots", slots);
    provide("handleSelect", handleSelect);
    provide("expandedKeys", expandedKeys);
    provide("selectedKey", localSelectedKey);
    provide("registerExpandedKeys", registerExpandedKeys);
    return () => (
      <TreeNodes
        onUpdate:elementList={(e) => {
          localTreeData.value = e;
        }}
        elementList={localTreeData.value}
      />
    );
  },
});

export default CTree;
