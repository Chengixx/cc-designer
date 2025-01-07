import { IEditorElement } from "../../types";
import { defineComponent, PropType, ref, watch } from "vue";
import { GroupOption, VBtnColorType } from "@cgx-designer/materials";
import {
  ElDivider,
  ElIcon,
  ElInput,
  ElPopconfirm,
  ElSwitch,
  ElTooltip,
} from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { QuestionMarkIcon } from "@cgx-designer/icons";
import { elementController } from "@cgx-designer/controller";

const SelectOption = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(_, { attrs, emit }) {
    const Button = elementController.getElementRender("button");
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
        <ElDivider content-position="center">选项配置</ElDivider>
        {bindValue.value?.map((option: GroupOption, index: number) => {
          return (
            <div class="c-flex c-justify-center c-items-center c-my-2">
              <ElInput
                class="c-w-2/5"
                v-model={option.label}
                placeholder="label"
              />
              <ElInput
                class="c-w-2/5 c-ml-1"
                v-model={option.value}
                placeholder="value"
              />

              <ElSwitch v-model={option.disabled} class="c-w-1/5 c-ml-1" />
              <ElPopconfirm
                title="确定删除吗？"
                onConfirm={() => handleDeleteOption(index)}
              >
                {{
                  reference: () => {
                    return (
                      <div class="c-w-1/5 c-ml-1 c-cursor-pointer">
                        <ElIcon>
                          <Delete />
                        </ElIcon>
                      </div>
                    );
                  },
                }}
              </ElPopconfirm>
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
          <ElTooltip
            effect="dark"
            content="switch控制是否禁用选项"
            placement="top"
          >
            <QuestionMarkIcon style={{ width: "16px", height: "16px" }} />
          </ElTooltip>
        </div>
      </div>
    );
  },
});

export default SelectOption;
