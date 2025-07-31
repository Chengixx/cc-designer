import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  ref,
} from "vue";
import Draggle from "./Draggle/index.vue";
import PanelWidget from "./PanelWidget";
import {
  FormManage,
  FunctionManage,
  HoverManage,
  ModeManage,
  ModeSize,
  ElementManage,
  FocusManage,
} from "@cgx-designer/hooks";
import { capitalizeFirstLetter } from "@cgx-designer/utils";
import { Empty } from "@cgx-designer/extensions";
import { elementController } from "@cgx-designer/controller";

const EditorCanvas = defineComponent({
  setup() {
    const Form = elementController.getElementRender("form");
    const formManager = inject("formManager") as FormManage;
    const elementManager = inject("elementManager") as ElementManage;
    const focusManager = inject("focusManager") as FocusManage;
    const hoverManager = inject("hoverManager") as HoverManage;
    const modeManager = inject("modeManager") as ModeManage;
    const functionManager = inject("functionManager") as FunctionManage;
    const editorCanvasRef = ref<HTMLDivElement>();
    provide("editorCanvasRef", editorCanvasRef);
    onMounted(() => {
      focusManager.initCanvas(editorCanvasRef.value!);
      hoverManager.initCanvas(editorCanvasRef.value!);
    });

    //获取表单的方法 事件
    const getFormFunction = computed(() => {
      const onEvent: Record<string, Function> = {};
      formManager.formSetting.on &&
        Object.keys(formManager.formSetting.on).forEach((item) => {
          onEvent["on" + capitalizeFirstLetter(item)] = (...args: any[]) =>
            functionManager.executeFunctions(
              formManager.formSetting.on![item],
              ...args
            );
        });
      return { ...onEvent };
    });

    //获取表单的属性
    const getFormProps = computed(() => {
      return {
        ...formManager.formSetting,
      };
    });
    return () => (
      <div class="c-h-full c-relative c-flex c-justify-center c-px-5 c-py-2">
        {elementManager.elementList.value.length == 0 && (
          <div class="c-pointer-events-none c-z-10 c-absolute c-left-1/2 c-top-1/2 c-transform -c-translate-x-1/2 -c-translate-y-1/2 c-text-gray-400 c-text-lg">
            <Empty />
          </div>
        )}
        <div
          class={[
            "c-overflow-y-auto c-h-[calc(100vh-116px)] c-relative c-transition-all",
            modeManager.mode.value !== "pc"
              ? "c-border-[10px] c-border-black dark:c-border-gray-700 c-box-border c-rounded-2xl"
              : "c-rounded-md",
          ]}
          style={{ width: ModeSize[modeManager.mode.value] }}
          ref={editorCanvasRef}
          onClick={(e) => focusManager.handleCanvasClick(e)}
        >
          {/* hover的盒子,选中的时候如果在这 */}
          <PanelWidget />
          <Form
            {...getFormFunction.value}
            {...getFormProps.value}
            class="c-w-full"
          >
            <Draggle
              elementSchemaList={elementManager.elementList.value}
              isNested={false}
            />
          </Form>
        </div>
      </div>
    );
  },
});
export default EditorCanvas;
