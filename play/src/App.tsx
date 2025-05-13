import { defineComponent, reactive, ref } from "vue";
import { ElButton, ElFormItem, ElInput } from "element-plus";
import { ElementDesigner } from "@cgx-designer/designer";
import { ElementRenderer } from "@cgx-designer/renderer";
import {
  FormSetting,
  BuilderSchema,
  ElementBuilderInstance,
  ElementBuilderExpose,
} from "@cgx-designer/types";
import { Switch } from "@element-plus/icons-vue";
import {
  elementSchemaList,
  formSetting,
  javaScript,
  builderSchema,
} from "./data";
import { VBtn } from "vuetify/components";

const App = defineComponent({
  setup() {
    const flag = ref<boolean>(true);
    const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
    const formData = reactive({
      foo: "",
      bar: "",
      la: "",
      number: 2,
      myName: "完优先级最高啊",
    });

    return () => {
      return (
        <div class="c-app c-overflow-x-hidden c-relative">
          {flag.value ? (
            <ElementDesigner />
          ) : (
            <div class="c-p-4">
              <VBtn>安娜</VBtn>
              {JSON.stringify(formData)}
              <ElementRenderer
                formData={formData}
                ref={elementBuilderRef as any}
                // script={javaScript}
                builderSchema={builderSchema}
                // elementSchemaList={elementSchemaList}
                // formSetting={formSetting}
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
              </ElementRenderer>
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
          <div class="c-fixed c-left-10 c-bottom-10">
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
