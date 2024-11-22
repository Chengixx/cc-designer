import { IEditorElement } from "../../types";
import { elementController, getRandomId } from "@cgx-designer/utils";
import { Delete } from "@element-plus/icons-vue";
import { ElButton, ElDivider, ElIcon, ElInputNumber, ElTooltip } from "element-plus";
import { defineComponent, PropType, ref } from "vue";

const ColList = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(_, { attrs }) {
    const bindValue = ref<IEditorElement[]>(
      attrs.modelValue as IEditorElement[]
    );

    const handleAddCol = () => {
      const colSchema = elementController.elementTemplate["col"](getRandomId);
      bindValue.value.push(colSchema);
    };

    const handleDeleteCol = (index: number) => {
      bindValue.value.splice(index, 1);
    };

    return () => (
      <div class="w-full">
        <ElDivider content-position="center">栅格管理</ElDivider>
        <div class="mt-2">
          {bindValue.value.map((col, index) => {
            return (
              <div key={index} class="w-full flex items-center mb-2">
                <div class="font-medium text-sm text-gray-600">
                  栅格{index + 1}:
                </div>
                <div class="ml-2">
                  <ElInputNumber v-model={col.props!.span} max={24} min={1} />
                </div>
                <ElTooltip effect="dark" content="删除组件" placement="bottom">
                  <div
                    class="ml-2 cursor-pointer"
                    onClick={(_) => handleDeleteCol(index)}
                  >
                    <ElIcon>
                      <Delete />
                    </ElIcon>
                  </div>
                </ElTooltip>
              </div>
            );
          })}
          <ElButton link type="primary" onClick={handleAddCol}>
            新增栅格
          </ElButton>
        </div>
      </div>
    );
  },
});

export default ColList;
