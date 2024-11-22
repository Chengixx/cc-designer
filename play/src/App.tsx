import { defineComponent, reactive, ref } from "vue";
import { ElButton, ElFormItem, ElInput } from "element-plus";
import {
  ElementDesigner,
  ElementBuilder,
  FormSetting,
  BuilderSchema,
  ElementBuilderInstance,
  ElementBuilderExpose,
} from "@cgx-designer/core";
import { Switch } from "@element-plus/icons-vue";
import {
  elementSchemaList,
  formSetting,
  javaScript,
  builderSchema,
} from "./data";

const App = defineComponent({
  setup() {
    const flag = ref<boolean>(true);
    const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
    const formData = reactive({
      foo: "",
      bar: "",
      la: "",
      number: 2,
    });

    return () => {
      return (
        <div class="app overflow-x-hidden relative">
          {flag.value ? (
            <ElementDesigner />
          ) : (
            <div class="p-4">
              {JSON.stringify(formData)}
              <ElementBuilder
                formData={formData}
                ref={elementBuilderRef as any}
                script={javaScript}
                // builderSchema={builderSchema}
                elementSchemaList={elementSchemaList}
                formSetting={formSetting}
              >
                {{
                  before: () => {
                    return <div>我是一个头部</div>;
                  },
                  default: () => {
                    return (
                      <ElFormItem
                        label="我是外部插槽"
                        prop={"la"}
                        rules={[{ required: true, message: "测试必须填" }]}
                      >
                        <ElInput v-model={formData.la} placeholder="请输入" />
                      </ElFormItem>
                    );
                  },
                }}
              </ElementBuilder>
              <ElButton
                onClick={() => {
                  console.log(elementBuilderRef.value!);
                }}
              >
                查看实例
              </ElButton>
              <ElButton
                onClick={() => {
                  //@ts-ignore
                  elementBuilderRef.value!.setFormData({
                    foo: "测试外部修改",
                    bar: "测试外部修改",
                  });
                }}
              >
                外部调用setFormData
              </ElButton>
              <ElButton
                onClick={() => {
                  formData.bar = "我可以修改哦是是";
                }}
              >
                直接修改传递的formData
              </ElButton>
              <ElButton
                onClick={() => {
                  //@ts-ignore
                  elementBuilderRef.value!.resetFormDataToEmpty({});
                }}
              >
                清空
              </ElButton>
              <ElButton
                onClick={() => {
                  //@ts-ignore
                  const formInstance = elementBuilderRef.value!.formRef;
                  console.log(formInstance);
                  formInstance.resetFields();
                }}
              >
                表单实例的设置默认值
              </ElButton>
            </div>
          )}
          <div class="fixed left-10 bottom-10">
            <ElButton
              type="primary"
              icon={Switch}
              circle
              onClick={() => {
                flag.value = !flag.value;
              }}
            />
          </div>
        </div>
      );
    };
  },
});
export default App;
