import { VList, VListItem, VListItemTitle, VMenu } from "vuetify/components";
import { defineComponent, PropType } from "vue";
import { GroupOption } from "../../../types";

const SelectPanel = defineComponent({
  inheritAttrs: false,
  props: {
    options: {
      type: Array as PropType<GroupOption[]>,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () => {
      const { options } = props;
      return (
        <VMenu activator="parent" {...attrs}>
          <VList>
            {options.map((option) => {
              return (
                <VListItem
                  key={option.value}
                  value={option.value}
                  onClick={() => {
                    emit("update:modelValue", option.value);
                  }}
                >
                  <VListItemTitle>{option.label}</VListItemTitle>
                </VListItem>
              );
            })}
          </VList>
        </VMenu>
      );
    };
  },
});

export default SelectPanel;
