import { inject, ref, defineComponent, watch, computed, PropType } from "vue";
import { FocusManage } from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";
import { HoverManage } from "@cgx-designer/hooks";
import { IEditorElement } from "@/types";
import ElementNode from "../../ElementNode";
import Draggle from "./Draggle.vue";

const EditorElement = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    const hoverManage = inject("hoverManage") as HoverManage;
    const elementManage = inject("elementManage") as ElementManage;
    const getComponentInstance = computed(() => {
      if (
        !props.elementSchema.id ||
        !elementManage.getElementInstanceById(props.elementSchema.id)
      ) {
        return null;
      }
      return elementManage.getElementInstanceById(props.elementSchema.id);
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
            hoverManage.handleHover(e, props.elementSchema, elementManage)
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
      focusManage.handleFocus(props.elementSchema, e);
    };
    return () => {
      return (
        <ElementNode element={props.elementSchema} ref={elementRef}>
          {{
            editNode: () => {
              if (props.elementSchema?.key === "row") {
                //就返回循环的elementList啊
                return (
                  <>
                    {props.elementSchema.elementList!.map(
                      (childElementSchema: IEditorElement) => {
                        return (
                          <EditorElement
                            elementSchema={childElementSchema}
                            key={childElementSchema.id}
                          />
                        );
                      }
                    )}
                  </>
                );
              } else {
                return (
                  <Draggle list={props.elementSchema.elementList!} isNested />
                );
              }
            },
          }}
        </ElementNode>
      );
    };
  },
});

export default EditorElement;
