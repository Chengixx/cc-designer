import {
  inject,
  ref,
  defineComponent,
  watch,
  computed,
  PropType,
  onUnmounted,
} from "vue";
import { FocusManage } from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";
import { HoverManage } from "@cgx-designer/hooks";
import { IEditorElement } from "../../../../../types";
import Draggle from "./Draggle.vue";
import ElementNode from "../../../../ElementNode";
import { useParentDomList } from "../../../../../constant";
import DragWidget from "./DragWidget";

const EditorElement = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    const hoverManage = inject("hoverManage") as HoverManage;
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const elementRef = ref<HTMLBaseElement | null>(null);
    const getComponentInstance = computed(() => {
      const id = props.elementSchema.id!;
      const elementInstance = elementManage.getElementInstanceById(id);
      if (!id || !elementInstance) return null;
      if (props.elementSchema.formItem) {
        return elementManage.getElementInstanceById(id + "-form-item").$el;
      }
      if (elementInstance.$el.nodeName === "#text") {
        return null;
      }
      // 有这个的话要返回他的父亲给他
      if (useParentDomList.includes(props.elementSchema.key)) {
        return elementInstance.$el.parentElement;
      } else {
        return elementInstance.$el;
      }
    });
    watch(
      () => getComponentInstance.value,
      (componentInstance) => {
        // console.log(getComponentInstance.value, "getComponentInstance");
        if (componentInstance) {
          componentInstance.addEventListener("click", (e: MouseEvent) =>
            handleClick(e)
          );
          componentInstance.addEventListener("mouseover", (e: MouseEvent) =>
            hoverManage.handleHover(e, props.elementSchema)
          );
          componentInstance.addEventListener("mouseout", (e: MouseEvent) =>
            hoverManage.handleCancelHover(e)
          );
        }
      }
    );
    onUnmounted(() => {
      if (getComponentInstance.value) {
        getComponentInstance.value.removeEventListener(
          "click",
          (e: MouseEvent) => handleClick(e)
        );
        getComponentInstance.value.removeEventListener(
          "mouseover",
          (e: MouseEvent) => hoverManage.handleHover(e, props.elementSchema)
        );
        getComponentInstance.value.removeEventListener(
          "mouseout",
          (e: MouseEvent) => hoverManage.handleCancelHover(e)
        );
      }
    });

    const handleClick = (e: MouseEvent) => {
      focusManage.handleFocus(props.elementSchema, e);
    };

    const isFocus = computed(() => {
      return focusManage.focusedElement.value?.id === props.elementSchema.id;
    });
    
    return () => {
      return (
        <>
          {isFocus.value && <DragWidget elementSchema={props.elementSchema} />}
          <ElementNode elementSchema={props.elementSchema} ref={elementRef}>
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
                    <Draggle
                      elementSchemaList={props.elementSchema.elementList!}
                      isNested
                    />
                  );
                }
              },
            }}
          </ElementNode>
        </>
      );
    };
  },
});

export default EditorElement;
