import { inject, ref, defineComponent, watch, computed } from "vue";
import { FocusManage } from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";
import { HoverManage } from "@cgx-designer/hooks";
import { IEditorElement } from "@/types";
import ElementNode from "../../ElementNode";
import Draggle from "./Draggle.vue";

const EditorElement = defineComponent({
  props: {
    element: { type: Object },
  },
  setup(props) {
    const hoverManage = inject("hoverManage") as HoverManage;
    const elementManage = inject("elementManage") as ElementManage;
    const getComponentInstance = computed(() => {
      if (
        !props.element!.id ||
        !elementManage.getElementInstanceById(props.element!.id)
      ) {
        return null;
      }
      return elementManage.getElementInstanceById(props.element!.id);
    });
    watch(
      () => getComponentInstance.value,
      () => {
        // console.log(getComponentInstance.value, "getComponentInstance");
        if (getComponentInstance.value) {
          getComponentInstance.value.addEventListener("click", (e) =>
            handleClick(e)
          );
          getComponentInstance.value.addEventListener("mouseover", (e) =>
            hoverManage.handleHover(e, props.element!, elementManage)
          );
          getComponentInstance.value.addEventListener("mouseout", (e) =>
            hoverManage.handleCancelHover(e)
          );
        }
      }
    );
    const focusManage = inject("focusManage") as FocusManage;
    const elementRef = ref<HTMLBaseElement | null>(null);
    const handleClick = (e: MouseEvent) => {
      focusManage.handleFocus(props.element as IEditorElement, e);
    };
    return () => {
      return (
        <ElementNode element={props.element as IEditorElement} ref={elementRef}>
          {{
            editNode: () => {
              if (props.element?.key === "row") {
                //就返回循环的elementList啊
                return (
                  <>
                    {props.element.elementList.map(
                      (element: IEditorElement) => {
                        return (
                          <EditorElement element={element} key={element.id} />
                        );
                      }
                    )}
                  </>
                );
              } else {
                return <Draggle list={props.element!.elementList} isNested />;
              }
            },
          }}
        </ElementNode>
      );
    };
  },
});

export default EditorElement;
