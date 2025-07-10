import { IEditorElement } from "@cgx-designer/types";
import { getRandomId } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { defineComponent, PropType, ref, watch, inject } from "vue";
import { Divider } from "@cgx-designer/extensions";
import { ClearIcon } from "@cgx-designer/icons";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";

const ColList = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(_, { attrs }) {
    const Button = elementController.getElementRender("button");
    const InputNumber = elementController.getElementRender("inputNumber");
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const bindValue = ref<IEditorElement[]>(
      attrs.modelValue as IEditorElement[]
    );

    watch(
      () => attrs.modelValue,
      (val) => {
        bindValue.value = val as IEditorElement[];
      },
      {
        immediate: true,
        deep: true,
      }
    );

    const handleAddCol = () => {
      const colSchema = elementController.elementTemplate["col"](getRandomId);
      bindValue.value.push(colSchema);
    };

    const handleDeleteCol = (index: number) => {
      const id = bindValue.value[index].id!;
      //Todo 深拷贝问题
      elementManage.deleteElementById(id);
      if (bindValue.value.length === 1) {
        focusManage.resetFocus();
      }
    };

    return () => (
      <div class="c-w-full">
        <Divider label="栅格配置" />
        <div class="c-mt-2">
          {bindValue.value.map((col, index) => {
            return (
              <div key={col.id} class="c-w-full c-flex c-items-center c-mb-2">
                <div class="c-font-medium c-text-sm c-text-gray-600">
                  栅格{index + 1}:
                </div>
                <div class="c-ml-2">
                  <InputNumber v-model={col.props!.span} max={24} min={1} />
                </div>
                <div class="c-ml-2" onClick={(_) => handleDeleteCol(index)}>
                  <ClearIcon class="c-h-4 c-w-4 dark:c-fill-white hover:c-fill-blue-500 dark:hover:c-fill-blue-500 c-cursor-pointer" />
                </div>
              </div>
            );
          })}
          <Button variant="text" link type="primary" onClick={handleAddCol}>
            新增栅格
          </Button>
        </div>
      </div>
    );
  },
});

export default ColList;
