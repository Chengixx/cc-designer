import { ElementManage } from "@cgx-designer/hooks";
import { defineComponent, inject, provide, reactive, ref } from "vue";
import ElementBuilderNode from "./ElementBuilderNode";
import { ElEmpty, ElForm, FormInstance } from "element-plus";

const ElementBuilder = defineComponent({
  setup(_, { expose }) {
    const elementManage = inject("elementManage") as ElementManage;
    let formData = reactive({});
    provide("formData", formData);
    const formRef = ref<FormInstance>();
    const resetFormDataToEmpty = () => {
      formData = reactive({});
    };
    expose({
      formRef,
      formData,
      resetFormDataToEmpty,
    });
    return () => {
      return (
        <>
          {elementManage.elementList.value.length ? (
            <ElForm ref={formRef} model={formData}>
              {elementManage.elementList.value.map((elementSchema) => {
                return (
                  <>
                    <ElementBuilderNode elementSchema={elementSchema} />
                  </>
                );
              })}
            </ElForm>
          ) : (
            <ElEmpty description="暂无表单元素哦~请添加!" />
          )}
        </>
      );
    };
  },
});
export default ElementBuilder;
