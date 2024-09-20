import { FocusManage } from "@cgx-designer/hooks";
import { ElCol } from "element-plus";
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  inject,
  PropType,
  renderSlot,
} from "vue";
import Draggle from "cgx-designer/src/components/EdiorCanvas/components/Draggle.vue";
import { HoverManage } from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";
import { IEditorElement } from "cgx-designer";

const Col = defineComponent({
  props: {
    elementSchema: Object as PropType<IEditorElement>,
  },
  setup(props: any,{slots}) {
    const hoverManage = inject("hoverManage") as HoverManage;
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    onMounted(() => {
      elementManage.addElementInstance(
        props.elementSchema!.id,
        elementRef.value!
      );
    });
    onBeforeUnmount(() => {
      elementManage.deleteElementInstance(props.elementSchema!.id);
    });
    const elementRef = ref<HTMLBaseElement | null>(null);
    return () => {
      return (
        <ElCol
          span={props.elementSchema.props.span}
          class="border-dashed border border-[#d9d9d9]"
        >
          {/* <div
            ref={elementRef}
            onMouseover={(e) =>
              hoverManage.handleHover(e, props.elementSchema, elementManage)
            }
            onMouseout={(e) => hoverManage.handleCancelHover(e)}
            id={props.elementSchema.id as string}
            class="h-full relative"
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              focusManage.handleFocus(props.elementSchema, e);
            }}
          >
            <Draggle list={props.elementSchema.elementList!} isNested={true} />
          </div> */}
                    {renderSlot(slots, "editNode", {}, () =>
            props.elementSchema.elementList.map(
              (subcomponentSchema: IEditorElement) =>
                renderSlot(slots, "node", {
                  element: subcomponentSchema,
                })
            )
          )}
        </ElCol>
      );
    };
  },
});

export default Col;
