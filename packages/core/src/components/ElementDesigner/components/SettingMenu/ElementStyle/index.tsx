import { FocusManage } from "@cgx-designer/hooks";
import { ElEmpty } from "element-plus";
import { computed, defineComponent, inject } from "vue";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";
import ComputedStyleWidget from "./components/ComputedStyleWidget";

const ElementStyle = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;

    const focusedElement = computed(() => {
      return focusManage.focusedElement.value;
    });

    return () => (
      <div class="w-full h-full" key={focusedElement.value?.id}>
        {focusedElement.value ? (
          <div class="w-full h-full">
            <ComputedStyleWidget
              modelValue={getValueByPath(focusedElement.value!, "style")}
              onUpdateModelValue={(v: string) => {
                setValueByPath(focusedElement.value!, "style", v);
              }}
            />
          </div>
        ) : (
          <div>
            <ElEmpty description="暂无选中元素" />
          </div>
        )}
      </div>
    );
  },
});

export default ElementStyle;
