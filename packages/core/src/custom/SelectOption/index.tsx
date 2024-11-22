import { IEditorElement } from "../../types";
import { defineComponent, PropType, ref, watch } from "vue";
import { GroupOption } from "@cgx-designer/ui";
import {
  ElButton,
  ElDivider,
  ElIcon,
  ElInput,
  ElPopconfirm,
  ElSwitch,
  ElTooltip,
} from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { QuestionMarkIcon } from "@cgx-designer/icons";

const SelectOption = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(_, { attrs, emit }) {
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
      <div class="w-full">
        <ElDivider content-position="center">选项配置</ElDivider>
        <div class="flex items-center gap-1">
          <ElButton link type="primary" onClick={() => handleAddOption()}>
            新增选项
          </ElButton>
          <ElTooltip
            effect="dark"
            content="switch控制是否禁用选项"
            placement="top"
          >
            <QuestionMarkIcon style={{ width: "16px", height: "16px" }} />
          </ElTooltip>
        </div>
        {bindValue.value?.map((option: GroupOption, index: number) => {
          return (
            <div class="flex justify-center items-center my-2">
              <ElInput
                class="w-2/5"
                v-model={option.label}
                placeholder="label"
              />
              <ElInput
                class="w-2/5 ml-1"
                v-model={option.value}
                placeholder="value"
              />

              <ElSwitch v-model={option.disabled} class="w-1/5 ml-1" />
              <ElPopconfirm
                title="确定删除吗？"
                onConfirm={() => handleDeleteOption(index)}
              >
                {{
                  reference: () => {
                    return (
                      <div class="w-1/5 ml-1 cursor-pointer">
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
      </div>
    );
  },
});

export default SelectOption;
