import { computed, defineComponent, provide, ref } from "vue";
import TreeNodes from "./TreeNodes.vue";
import { IElementSchema } from "@cgx-designer/types";

const CTree = defineComponent({
  inheritAttrs: false,
  emits: ["nodeClick", "update:selectedKey", "update:elementList"],
  props: {
    selectedKey: {
      type: String,
      default: "",
    },
    elementList: {
      type: Array<IElementSchema>,
      default: () => [],
    },
    draggable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, emit }) {
    const expandedKeys = ref<string[]>([]);
    const handleSelect = (id: string, elementSchema: IElementSchema) => {
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

    provide("treeRootProp", props);
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
