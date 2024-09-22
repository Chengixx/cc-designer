import { ElementManage } from "@cgx-designer/hooks";
import { defineComponent, inject, ref } from "vue";
import ElementBuilderNode from "./ElementBuilderNode";
import { ElForm, FormInstance } from "element-plus";

const ElementBuilder = defineComponent({
  setup(_, { expose }) {
    const elementManage = inject("elementManage") as ElementManage;
    const formRef = ref<FormInstance>();
    expose({
      formRef,
    });
    return () => {
      return (
        <>
          <ElForm ref={formRef}>
            {elementManage.elementList.value.map((elementSchema) => {
              return (
                <>
                  <ElementBuilderNode elementSchema={elementSchema} />
                </>
              );
            })}
          </ElForm>
        </>
      );
    };
  },
});
export default ElementBuilder;
