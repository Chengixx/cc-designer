import { FocusManage, FormManage } from "@cgx-designer/hooks";
import { computed, defineComponent, inject } from "vue";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { EventSetting } from "../../../custom";
import { defaultEvents } from "./constant";
const ElementEvent = defineComponent({
  setup() {
    const elementConfigMap = elementController.elementConfigMap;
    const formManage = inject("formManage") as FormManage;
    const focusManage = inject("focusManage") as FocusManage;

    const focusedElement = computed(() => {
      return focusManage.focusedElement.value;
    });

    const eventList = computed(() => {
      if (!focusedElement.value) return defaultEvents;
      const elementEvents =
        elementConfigMap[focusedElement.value!.key].config?.event ?? [];
      return elementEvents.length
        ? defaultEvents.concat({
            title: "组件事件",
            events:
              elementConfigMap[focusedElement.value!.key].config?.event ?? [],
          })
        : defaultEvents;
    });

    return () => (
      <div>
        <EventSetting
          key={focusedElement.value?.id}
          eventList={eventList.value}
          modelValue={getValueByPath(
            focusedElement.value || formManage.formSetting,
            `on`
          )}
          onUpdateModelValue={(v: any) => {
            setValueByPath(
              focusedElement.value || formManage.formSetting,
              `on`,
              v
            );
          }}
        />
      </div>
    );
  },
});

export default ElementEvent;
