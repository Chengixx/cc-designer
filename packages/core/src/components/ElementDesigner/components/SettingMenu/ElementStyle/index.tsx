import { FocusManage } from "@cgx-designer/hooks";
import { computed, defineComponent, inject } from "vue";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";
import ElementNode from "../../../../ElementNode";
import { defaultStyleSchema } from "./constant";
import Empty from "../../../../Empty";
import { CFormItem } from "@cgx-designer/extensions";

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
              <CFormItem label={styleConfig.label || undefined}>
                <ElementNode
                  elementSchema={{ ...styleConfig, formItem: false }}
                  provideValue={getValueByPath(
                    focusedElement.value!,
                    styleConfig.field!
                  )}
                  onUpdateProvideValue={(v: any) =>
                    setValueByPath(focusedElement.value!, styleConfig.field!, v)
                  }
                />
              </CFormItem>
            ))}
          </>
        ) : (
          <div>
            <Empty />
          </div>
        )}
      </div>
    );
  },
});

export default ElementStyle;
