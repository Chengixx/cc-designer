import { FocusManage } from "@cgx-designer/hooks";
import { ElCol } from "element-plus";
import { defineComponent, onMounted, onBeforeUnmount, ref, inject } from "vue";
import Draggle from "cgx-designer/src/components/EdiorCanvas/components/Draggle.vue";
import ButtonTool from "cgx-designer/src/components/EdiorCanvas/components/ButtonTool";
import { HoverManage } from "@cgx-designer/hooks";
import { ElementManage } from "@cgx-designer/hooks";

const Col = defineComponent({
  props: {
    col: Object,
  },
  setup(props: any) {
    const hoverManage = inject("hoverManage") as HoverManage;
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    onMounted(() => {
      elementManage.addElementInstance(props.col!.id, elementRef.value!);
    });
    onBeforeUnmount(() => {
      elementManage.deleteElementInstance(props.col!.id);
    });
    const elementRef = ref<HTMLBaseElement | null>(null);
    return () => {
      return (
        <ElCol
          span={props.col.props.span}
          class="border-dashed border border-[#d9d9d9]"
        >
          <div
            ref={elementRef}
            onMouseover={(e) =>
              hoverManage.handleHover(e, props.col, elementManage)
            }
            onMouseout={(e) => hoverManage.handleCancelHover(e)}
            id={props.col.id as string}
            class="h-full relative"
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              focusManage.handleFocus(props.col, e);
            }}
          >
            <Draggle
              list={props.col.elementList!}
              isNested={true}
              elementKey={props.col.key}
            />
          </div>
        </ElCol>
      );
    };
  },
});

export default Col;
