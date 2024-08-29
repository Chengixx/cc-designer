import {
  ElButton,
  ElDivider,
  ElIcon,
  ElInput,
  ElPopconfirm,
} from "element-plus";
import { defineComponent } from "vue";
import useFocus from "@/hook/useFocus";
import { GroupOption } from "@/config/template/Select";
import { Delete } from "@element-plus/icons-vue";

const SelectOptions = defineComponent({
  setup() {
    const { getFocusElement } = useFocus();
    const handleAddOption = () => {
      const options = getFocusElement()?.props.options;
      getFocusElement()?.props.options.push({
        label: `label${options.length + 1}`,
        value: `${options.length + 1}`,
      });
    };
    const handleDeleteOption = (index: number) => {
      getFocusElement()?.props.options.splice(index, 1);
    };
    return () => {
      return (
        <div>
          <ElDivider content-position="center">选项配置</ElDivider>
          <ElButton text type="primary" onClick={() => handleAddOption()}>
            新增选项
          </ElButton>
          {getFocusElement()?.props.options.map(
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
