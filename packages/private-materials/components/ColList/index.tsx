import { IElementSchema } from "@cgx-designer/types";
import { getRandomId } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { defineComponent, PropType, ref, watch, inject } from "vue";
import { Divider } from "@cgx-designer/extensions";
import { ClearIcon } from "@cgx-designer/icons";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";

const ColList = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IElementSchema>, required: true },
  },
  setup(_, { attrs }) {
    const Button = elementController.getElementRender("button");
    const InputNumber = elementController.getElementRender("inputNumber");
    const elementManager = inject("elementManager") as ElementManage;
    const focusManager = inject("focusManager") as FocusManage;
    const bindValue = ref<IElementSchema[]>(
      attrs.modelValue as IElementSchema[]
    );

    watch(
      () => attrs.modelValue,
      (val) => {
        bindValue.value = val as IElementSchema[];
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
      elementManager.deleteElementById(id);
      //如果空了的情况下才重制选中
      if (bindValue.value.length === 0) {
        focusManager.resetFocus();
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
