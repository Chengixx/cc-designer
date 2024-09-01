import { ElEmpty, ElForm } from "element-plus";
import { defineComponent, inject } from "vue";
import Draggle from "./components/Draggle.vue";
import { onMounted, ref } from "vue";
import { FocusManage } from "@cgx-designer/hooks";
import { FormManage } from "@cgx-designer/hooks";
import { HoverManage } from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";

const Empty = () => {
  return (
    <div class="pointer-events-none z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-lg">
      <ElEmpty description="目前还没有元素哦，从左侧组件拖拽或双击添加吧！" />
    </div>
  );
};

const EdiorCanvas = defineComponent({
  setup() {
    const formManage = inject("formManage") as FormManage
    const hoverManage = inject("hoverManage") as HoverManage
    const elementManage = inject("elementManage") as ElementManage
    const focusManage = inject("focusManage") as FocusManage
    const hoverWidgetRef = ref<HTMLDivElement | null>(null);
    onMounted(() => {
      hoverManage.sethoverWidgetRef(hoverWidgetRef.value!);
    });
    return () => {
      return (
        <>
          {elementManage.elementList.value.length == 0 && <Empty />}
          {/* hover的盒子,选中的时候如果在这 */}
          <div
            v-show={hoverManage.showHoverBox.value && hoverManage.hoverElementId.value !== focusManage.getFocusElement()?.id}
            ref={hoverWidgetRef}
            class="absolute z-50 border border-dashed border-blue-500 pointer-events-none transition-all"
          />
          <div class="mx-4 mt-2">
            <ElForm
              labelWidth={formManage.formSetting.labelWidth}
              labelPosition={formManage.formSetting.labelPosition}
              size={formManage.formSetting.size}
              class="w-full"
            >
              <Draggle list={elementManage.elementList.value} isNested={false} />
            </ElForm>
          </div>
        </>
      );
    };
  },
});
export default EdiorCanvas;
