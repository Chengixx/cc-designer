import {
  ElButton,
  ElDivider,
  ElIcon,
  ElInput,
  ElPopconfirm,
} from "element-plus";
import { defineComponent, inject } from "vue";
import { FocusManage } from "@cgx-designer/hooks";
import { GroupOption } from "@cgx-designer/ui/template/Select/index";
import { Delete } from "@element-plus/icons-vue";

const SelectOptions = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage
    const handleAddOption = () => {
      const options = focusManage.focusedElement.value?.props.options;
      focusManage.focusedElement.value?.props.options.push({
        label: `label${options.length + 1}`,
        value: `${options.length + 1}`,
      });
    };
    const handleDeleteOption = (index: number) => {
      focusManage.focusedElement.value?.props.options.splice(index, 1);
    };
    return () => {
      return (
        <div>
          <ElDivider content-position="center">选项配置</ElDivider>
          <ElButton text type="primary" onClick={() => handleAddOption()}>
            新增选项
          </ElButton>
          {focusManage.focusedElement.value?.props.options.map(
            (option: GroupOption, index: number) => {
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
            }
          )}
        </div>
      );
    };
  },
});
export default SelectOptions;
