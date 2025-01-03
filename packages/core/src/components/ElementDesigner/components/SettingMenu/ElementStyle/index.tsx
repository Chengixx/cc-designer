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
      <div class="c-w-full c-h-full" key={focusedElement.value?.id}>
        {focusedElement.value ? (
          <>
            {defaultStyleSchema.map((styleConfig) => (
              <div class="c-w-full c-flex c-mb-3 c-items-center">
                <ElRow class="c-w-full">
                  {styleConfig.label && (
                    <ElCol span={6}>
                      <div class="c-font-medium c-text-sm c-text-gray-600 c-h-full c-flex c-items-center dark:text-gray-300">
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
