import { FocusManage } from "@cgx-designer/hooks";
import { ElCol, ElEmpty, ElRow } from "element-plus";
import { computed, defineComponent, inject } from "vue";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";
import ComputedStyleWidget from "./components/ComputedStyleWidget";
import { IEditorElement } from "@cgx-designer/core";
import ElementNode from "../../../../ElementNode";

const ElementStyle = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
    const defaultStyleSchema: IEditorElement[] = [
      {
        label: "宽度",
        key: "styleInput",
        field: "style.width",
        props: {
          placeholder: "请输入宽度",
          size: "default",
        },
      },
    ];
    const focusedElement = computed(() => {
      return focusManage.focusedElement.value;
    });

    return () => (
      <div class="w-full h-full" key={focusedElement.value?.id}>
        {focusedElement.value ? (
          <>
            {defaultStyleSchema.map((styleConfig) => (
              <div class="w-full flex mb-3 items-center">
                <ElRow class="w-full">
                  <ElCol span={6}>
                    <div class="font-medium text-sm text-gray-600 h-full flex items-center dark:text-gray-300">
                      {styleConfig.label}:
                    </div>
                  </ElCol>
                  <ElCol span={18}>
                    <ElementNode
                      elementSchema={{ ...styleConfig, formItem: false }}
                      provideValue={getValueByPath(
                        focusedElement.value!,
                        styleConfig.field!
                      )}
                      onUpdateProvideValue={(v: any) =>
                        setValueByPath(
                          focusedElement.value!,
                          styleConfig.field!,
                          v
                        )
                      }
                    />
                  </ElCol>
                </ElRow>
              </div>
            ))}
            <div class="w-full h-full">
              <ComputedStyleWidget
                modelValue={getValueByPath(focusedElement.value!, "style")}
                onUpdateModelValue={(v: string) => {
                  setValueByPath(focusedElement.value!, "style", v);
                }}
              />
            </div>
          </>
        ) : (
          <div>
            <ElEmpty description="暂无选中元素" />
          </div>
        )}
      </div>
    );
  },
});

export default ElementStyle;
