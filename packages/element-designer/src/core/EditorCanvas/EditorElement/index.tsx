import { inject, ref, defineComponent, watch, computed, PropType } from "vue";
import { FocusManage } from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";
import { HoverManage } from "@cgx-designer/hooks";
import { IElementSchema } from "@cgx-designer/types";
import Draggle from "../Draggle/index.vue";
import { ElementEngine } from "@cgx-designer/element-engine";
import DragWidget from "../DragWidget";
import { useEventListener } from "@vueuse/core";
import { getElementDomInstance } from "@cgx-designer/hooks";

const EditorElement = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IElementSchema>, required: true },
  },
  setup(props) {
    const hoverManager = inject("hoverManager") as HoverManage;
    const elementManager = inject("elementManager") as ElementManage;
    const focusManager = inject("focusManager") as FocusManage;
    const elementRef = ref<HTMLBaseElement | null>(null);

    // 使用共享的DOM实例逻辑
    const getComponentInstance = computed(() =>
      getElementDomInstance(elementManager, props.elementSchema)
    );

    watch(
      () => getComponentInstance.value,
      (componentInstance) => {
        if (componentInstance) {
          useEventListener(componentInstance, "click", handleClick);
          useEventListener(componentInstance, "mouseover", (e: MouseEvent) =>
            hoverManager.handleHover(e, props.elementSchema)
          );
          useEventListener(componentInstance, "mouseout", (e: MouseEvent) =>
            hoverManager.handleCancelHover(e)
          );
        }
      }
    );

    const handleClick = (e: MouseEvent) => {
      focusManager.handleFocus(props.elementSchema, e);
    };

    const isFocus = computed(() => {
      return focusManager.focusedElement.value?.id === props.elementSchema.id;
    });

    return () => (
      <>
        {isFocus.value && <DragWidget elementSchema={props.elementSchema} />}
        <ElementEngine elementSchema={props.elementSchema} ref={elementRef}>
          {{
            editNode: () => {
              if (
                props.elementSchema?.key === "row" ||
                props.elementSchema?.key === "tab"
              ) {
                //就返回循环的elementList啊
                return (
                  <>
                    {props.elementSchema.elementList!.map(
                      (childElementSchema: IElementSchema) => {
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
                  <Draggle
                    elementSchemaList={props.elementSchema.elementList!}
                    isNested
                  />
                );
              }
            },
          }}
        </ElementEngine>
      </>
    );
  },
});

export default EditorElement;
