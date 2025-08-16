import { IElementSchema } from "@cgx-designer/types";
import { defineComponent, PropType, ref, watch } from "vue";
import {
  GroupOption,
  VBtnColorType,
  vuetifyConfig,
} from "@cgx-designer/base-materials";
import { elementController } from "@cgx-designer/controller";
import { ClearIcon } from "@cgx-designer/icons";
import { Divider } from "@cgx-designer/extensions";

const SelectOption = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IElementSchema>, required: true },
    disabledFlag: { type: Boolean, default: false },
  },
  setup(props, { attrs, emit }) {
    // const { disabledFlag = false } = props;
    // const Switch = elementController.getElementRender("switch");
    const Button = elementController.getElementRender("button");
    const Input = elementController.getElementRender("input");
    const bindValue = ref<GroupOption[]>(attrs.modelValue as GroupOption[]);
    watch(
      () => bindValue.value,
      () => {
        emit("update:modelValue", bindValue.value);
      },
      { deep: true }
    );
    const handleAddOption = () => {
      bindValue.value.push({
        label: `label${bindValue.value.length + 1}`,
        value: `value${bindValue.value.length + 1}`,
      });
    };
    const handleDeleteOption = (index: number) => {
      bindValue.value.splice(index, 1);
    };
    return () => (
      <div class="c-w-full">
        <Divider label="选项配置" />
        {bindValue.value?.map((option: GroupOption, index: number) => {
          return (
            <div class="c-flex c-justify-center c-items-center c-my-2">
              <Input
                class="c-w-2/5"
                {...vuetifyConfig}
                v-model={option.label}
                placeholder="label"
              />
              <Input
                class="c-w-2/5 c-ml-1"
                {...vuetifyConfig}
                v-model={option.value}
                placeholder="value"
              />
              <div class="c-flex c-items-center">
                {/* {disabledFlag && (
                  <Switch
                    {...vuetifyConfig}
                    v-model={option.disabled}
                    class="c-ml-1"
                  />
                )} */}
                <div
                  class="c-flex c-items-center c-h-full c-ml-3"
                  onClick={() => handleDeleteOption(index)}
                >
                  <ClearIcon class="c-h-4 c-w-4 dark:c-fill-white hover:c-fill-blue-500 dark:hover:c-fill-blue-500 c-cursor-pointer" />
                </div>
              </div>
            </div>
          );
        })}
        <div class="c-flex c-items-center c-gap-1">
          <Button
            variant="text"
            link
            type="primary"
            color={VBtnColorType.primary}
            onClick={() => handleAddOption()}
          >
            新增选项
          </Button>
        </div>
      </div>
    );
  },
});

export default SelectOption;
