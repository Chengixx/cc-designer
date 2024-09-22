import { ElementManage } from "@cgx-designer/hooks";
import { defineComponent, inject, ref } from "vue";
import ElementBuilderNode from "./ElementBuilderNode";
import { ElForm, FormInstance } from "element-plus";

const ElementBuilder = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    const formRef = ref<FormInstance>();
    const handleClick = () => {
      console.log("formRef", formRef.value);
    };
    return () => {
      return (
        <>
          <button onClick={handleClick}>查看formRef</button>
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
