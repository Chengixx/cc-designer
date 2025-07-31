import { FocusManage, QueueManage } from "@cgx-designer/hooks";
import { computed, defineComponent, inject } from "vue";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";
import { ElementEngine } from "@cgx-designer/element-engine";
import { defaultStyleSchema } from "./constant";
import { Empty } from "@cgx-designer/extensions";
import { CFormItem } from "@cgx-designer/extensions";

const ElementStyle = defineComponent({
  setup() {
    const focusManager = inject("focusManager") as FocusManage;
    const queueManager = inject("queueManager") as QueueManage;
    const focusedElement = computed(() => {
      return focusManager.focusedElement.value;
    });

    return () => (
      <div class="c-w-full c-h-full" key={focusedElement.value?.id}>
        {focusedElement.value ? (
          <>
            {defaultStyleSchema.map((styleConfig) => (
              <CFormItem label={styleConfig.label || undefined}>
                <ElementEngine
                  elementSchema={{ ...styleConfig, formItem: false }}
                  modelValue={
                    styleConfig.getter
                      ? styleConfig.getter(focusedElement.value!)
                      : getValueByPath(
                          focusedElement.value!,
                          styleConfig.field!
                        )
                  }
                  onUpdate:modelValue={(v: any) => {
                    styleConfig.setter
                      ? styleConfig.setter(
                          focusedElement.value!,
                          v,
                          styleConfig.field!
                        )
                      : setValueByPath(
                          focusedElement.value!,
                          styleConfig.field!,
                          v
                        );
                    queueManager.push("elementStyle");
                  }}
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
