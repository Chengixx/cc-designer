import { useElementStore } from "@/store/modules/element";
import { ElEmpty, ElForm } from "element-plus";
import { defineComponent } from "vue";
import Draggle from "@/components/EdiorCanvas/components/Draggle.vue";
import { useFormStore } from "@/store/modules/form";
import { usehoverStore } from "@/store/modules/hover";
import { onMounted, ref } from "vue";
import useFocus from "@/hook/useFocus";

const Empty = () => {
  return (
    <div class="pointer-events-none z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-lg">
      <ElEmpty description="目前还没有元素哦，从左侧组件拖拽或双击添加吧！" />
    </div>
  );
};

const EdiorCanvas = defineComponent({
  setup() {
    const { formSetting } = useFormStore();
    const { sethoverWidgetRef } = usehoverStore();
    const hoverWidgetRef = ref<HTMLDivElement | null>(null);
    onMounted(() => {
      sethoverWidgetRef(hoverWidgetRef.value!);
    });
    return () => {
      return (
        <>
          {useElementStore().elementList.length == 0 && <Empty />}
          {/* hover的盒子,选中的时候如果在这 */}
          <div
            v-show={usehoverStore().showHoverBox && usehoverStore().hoverElementId !== useFocus().getFocusElement()?.id}
            ref={hoverWidgetRef}
            class="absolute z-50 border border-dashed border-blue-500 pointer-events-none transition-all"
          />
          <div class="mx-4 mt-2">
            <ElForm
              labelWidth={formSetting.labelWidth}
              labelPosition={formSetting.labelPosition}
              size={formSetting.size}
              class="w-full"
            >
              <Draggle list={useElementStore().elementList} isNested={false} />
            </ElForm>
          </div>
        </>
      );
    };
  },
});
export default EdiorCanvas;
