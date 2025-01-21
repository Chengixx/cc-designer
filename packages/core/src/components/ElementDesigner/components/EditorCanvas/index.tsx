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
import Empty from "../../../Empty";
import { elementController } from "@cgx-designer/controller";

const EditorCanvas = defineComponent({
  setup() {
    const Form = elementController.getElementRender("form");
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

    //获取表单的属性
    const getFormProps = computed(() => {
      return {
        ...formManage.formSetting,
      };
    });
    return () => {
      return (
        <>
          {elementManage.elementList.value.length == 0 && (
            <div class="c-pointer-events-none c-z-10 c-absolute c-left-1/2 c-top-1/2 c-transform -c-translate-x-1/2 -c-translate-y-1/2 c-text-gray-400 c-text-lg">
              <Empty />
            </div>
          )}
          <div
            class={[
              "c-overflow-y-auto c-h-[calc(100vh-108px)] c-relative c-transition-all",
              modeManage.mode.value !== "pc"
                ? "c-border-[10px] c-border-black dark:c-border-gray-700 c-box-border c-rounded-2xl"
                : "c-rounded-md",
            ]}
            style={{ width: ModeSize[modeManage.mode.value] }}
            ref={editorCanvasRef}
            onClick={(e) => focusManage.handleCanvasClick(e)}
          >
            {/* hover的盒子,选中的时候如果在这 */}
            <PanelWidget />
            <Form
              {...getFormFunction.value}
              {...getFormProps.value}
              class="c-w-full"
            >
              <Draggle
                elementSchemaList={elementManage.elementList.value}
                isNested={false}
              />
            </Form>
          </div>
        </>
      );
    };
  },
});
export default EditorCanvas;
