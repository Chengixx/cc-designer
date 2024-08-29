import useFocus from "@/hook/useFocus";
import { usehoverStoreHook } from "@/store/modules/hover";
import { ElCol } from "element-plus";
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import Draggle from "@/components/EdiorCanvas/components/Draggle.vue";
import ButtonTool from "@/components/EdiorCanvas/components/ButtonTool";
import { useElementStore } from "@/store/modules/element";

const Col = defineComponent({
  props: {
    col: Object,
  },
  setup(props: any) {
    onMounted(() => {
      useElementStore().addElementInstance(props.col!.id, elementRef.value!)
    })
    onBeforeUnmount(() => {
      useElementStore().deleteElementInstance(props.col!.id)
    })
    const elementRef = ref<HTMLBaseElement | null>(null);
    const { handleCancelHover, handleHover } = usehoverStoreHook()
    const { handleElementClick } = useFocus();
    return () => {
      return (
        <ElCol span={props.col.props.span} class="border-dashed border border-[#d9d9d9]">
          <div
            ref={elementRef}
            onMouseover={e => handleHover(e, props.col.id as string)}
            onMouseout={e => handleCancelHover(e)}
            id={props.col.id as string}
            class={[
              props.col.focus ? "border border-dashed border-blue-500 bg-[#f4f8fe]" : "",
              "h-full relative",
            ]}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              handleElementClick(props.col, e);
            }}
          >
            <Draggle list={props.col.elementList!} isNested={true} elementKey={props.col.key} />
            {props.col.focus && <ButtonTool />}
          </div>
        </ElCol>
      )
    }
  }
})

export default Col;