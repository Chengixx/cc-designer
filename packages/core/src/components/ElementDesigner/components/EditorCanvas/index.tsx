import { ElEmpty, ElForm } from "element-plus";
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import Draggle from "./components/Draggle.vue";
import {
  FormManage,
  FunctionManage,
  HoverManage,
  ModeManage,
  ModeSize,
} from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";
import PanelWidget from "./components/PanelWidget";
import { FocusManage } from "@cgx-designer/hooks/src/useFocus";
import { stringFirstBigger } from "@cgx-designer/utils";

const Empty = () => {
  return (
    <div class="pointer-events-none z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-lg">
      <ElEmpty description="目前还没有元素哦，从左侧组件拖拽或点击添加吧！" />
    </div>
  );
};

const EditorCanvas = defineComponent({
  setup() {
    const formManage = inject("formManage") as FormManage;
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const hoverManage = inject("hoverManage") as HoverManage;
    const modeManage = inject("modeManage") as ModeManage;
    const functionManage = inject("functionManage") as FunctionManage;
    const editorCanvasRef = ref<HTMLDivElement>();
    onMounted(() => {
      focusManage.initCanvas(editorCanvasRef.value!);
      hoverManage.initCanvas(editorCanvasRef.value!);
    });

    //获取表单的方法 事件
    const getFormFunction = computed(() => {
      const onEvent: Record<string, Function> = {};
      formManage.formSetting.on &&
        Object.keys(formManage.formSetting.on).forEach((item) => {
          onEvent["on" + stringFirstBigger(item)] = (...args: any[]) =>
            functionManage.executeFunctions(
              formManage.formSetting.on![item],
              ...args
            );
        });
      return { ...onEvent };
    });
    return () => {
      return (
        <>
          {elementManage.elementList.value.length == 0 && <Empty />}
          <div
            class={[
              "overflow-y-auto h-[calc(100vh-108px)] relative transition-all",
              modeManage.mode.value !== "pc"
                ? "border-[10px] border-black dark:border-gray-700 box-border rounded-2xl"
                : "rounded-md",
            ]}
            style={{ width: ModeSize[modeManage.mode.value] }}
            ref={editorCanvasRef}
            onClick={(e) => focusManage.handleCanvasClick(e)}
          >
            {/* hover的盒子,选中的时候如果在这 */}
            <PanelWidget />
            <ElForm
            {...getFormFunction.value}
              labelWidth={formManage.formSetting.labelWidth}
              labelPosition={formManage.formSetting.labelPosition}
              size={formManage.formSetting.size}
              disabled={formManage.formSetting.disabled}
              class="w-full"
            >
              <Draggle
                elementSchemaList={elementManage.elementList.value}
                isNested={false}
              />
            </ElForm>
          </div>
        </>
      );
    };
  },
});
export default EditorCanvas;
