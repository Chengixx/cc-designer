import { castArray } from "lodash-es";
import { defineComponent, PropType, provide, Ref, ref, watch } from "vue";

export type CollapseActiveName = string | number;

export type CollapseContext = {
  activeNames: Ref<CollapseActiveName[]>;
  handleItemClick: (name: CollapseActiveName) => void;
};

const Collapse = defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<CollapseActiveName[]>,
      default: () => [],
    },
    accordion: {
      type: Boolean,
      default: false,
    },
    noBorderTop: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, slots }) {
    // 当前哪几个是打开的
    const activeNames = ref<CollapseActiveName[]>(props.modelValue);
    const setActiveNames = (_activeNames: CollapseActiveName[]) => {
      activeNames.value = _activeNames;
      const value = props.accordion ? activeNames.value[0] : activeNames.value;
      emit("update:modelValue", value);
      emit("change", value);
    };
    const handleItemClick = (name: CollapseActiveName) => {
      if (props.accordion) {
        setActiveNames([activeNames.value[0] === name ? "" : name]);
      } else {
        const _activeNames = [...activeNames.value];
        const index = _activeNames.indexOf(name);

        if (index > -1) {
          _activeNames.splice(index, 1);
        } else {
          _activeNames.push(name);
        }
        setActiveNames(_activeNames);
      }
    };
    watch(
      () => props.modelValue,
      () => (activeNames.value = castArray(props.modelValue)),
      { deep: true }
    );

    provide("collapseContext", {
      activeNames,
      handleItemClick,
    });
    return () => (
      <div
        class={[
          "c-border-t c-border-[#d8d8d8] dark:c-border-darkMode",
          props.noBorderTop && "c-border-t-0",
        ]}
      >
        {slots.default?.()}
      </div>
    );
  },
});

export default Collapse;
