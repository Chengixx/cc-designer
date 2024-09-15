import {
  inject,
  ref,
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { ElementConfig } from "@cgx-designer/utils";
import { FocusManage } from "@cgx-designer/hooks";
import { ElementManage, IEditorElement } from "@cgx-designer/hooks";
import { HoverManage } from "@cgx-designer/hooks";
import { ElFormItem } from "element-plus";
import ButtonTool from "./ButtonTool";

const EditorElement = defineComponent({
  props: {
    element: { type: Object },
  },
  setup(props) {
    const hoverManage = inject("hoverManage") as HoverManage;
    const elementManage = inject("elementManage") as ElementManage;

    onMounted(() => {
      elementManage.addElementInstance(props.element!.id, elementRef.value!);
    });
    //!一定要用onBeforeUnmount,用onUnmounted不行,顺序会出问题
    onBeforeUnmount(() => {
      elementManage.deleteElementInstance(props.element!.id);
    });
    const focusManage = inject("focusManage") as FocusManage;
    const elementRef = ref<HTMLBaseElement | null>(null);
    const handleClick = (e: MouseEvent) => {
      focusManage.handleFocus(props.element as IEditorElement, e);
    };
    return () => {
      //先从元素配置那里拿到
      const elementConfig = inject<ElementConfig>("elementConfig");
      //渲染出来的组件
      const elementRender = elementConfig?.elementRenderMap[props.element!.key];
      return (
        <div
          onMouseover={(e) =>
            hoverManage.handleHover(e, props.element!, elementManage)
          }
          onMouseout={(e) => hoverManage.handleCancelHover(e)}
          id={props.element!.id}
          class="h-full flex items-center relative"
          ref={elementRef}
          onClick={(e: MouseEvent) => handleClick(e)}
        >
          {/* //!当前选中的元素不是row 就普通元素 然后如果是有默认值 */}
          {/* //!也就是表单元素的 就要加ElFormItem 为了更好的体验而已 */}
          {Object.keys(props.element!.props).includes("defaultValue") ? (
            <ElFormItem
              // !这里我知道没有click 但是必须加这个 不能有默认的事件的
              //@ts-expect-error
              onClick={(e: MouseEvent) => e.preventDefault()}
              label={
                !!props.element!.props.label
                  ? props.element!.props.label
                  : props.element!.key
              }
              class="w-full"
              labelPosition={props.element!.props.labelPosition}
              style={{ marginBottom: "0px !important" }}
            >
              {h(elementRender, props.element!)}
            </ElFormItem>
          ) : (
            <>{h(elementRender, props.element!)}</>
          )}
        </div>
      );
    };
  },
});

export default EditorElement;
