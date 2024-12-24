import { FocusManage } from "@cgx-designer/hooks";
import { ElCol, ElEmpty, ElRow } from "element-plus";
import { computed, defineComponent, inject } from "vue";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";
import ElementNode from "../../../../ElementNode";
import { defaultStyleSchema } from "./constant";

const ElementStyle = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
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
                  {styleConfig.label && (
                    <ElCol span={6}>
                      <div class="font-medium text-sm text-gray-600 h-full flex items-center dark:text-gray-300">
                        {styleConfig.label}:
                      </div>
                    </ElCol>
                  )}
                  <ElCol span={styleConfig.label ? 18 : 24}>
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
