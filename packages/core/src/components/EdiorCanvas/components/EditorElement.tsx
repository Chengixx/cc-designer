import {
  inject,
  ref,
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { FocusManage } from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";
import { HoverManage } from "@cgx-designer/hooks";
import { IEditorElement } from "@/types";
import ElementNode from "../../ElementNode";

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
      return (
        <div
          onMouseover={(e) =>
            hoverManage.handleHover(e, props.element!, elementManage)
          }
          onMouseout={(e) => hoverManage.handleCancelHover(e)}
          class="h-full flex items-center relative"
          ref={elementRef}
          onClick={(e: MouseEvent) => handleClick(e)}
        >
          <ElementNode element={props.element!} />
        </div>
      );
    };
  },
});

export default EditorElement;
