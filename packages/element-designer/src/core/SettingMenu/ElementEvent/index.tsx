import { FocusManage, FormManage, QueueManage } from "@cgx-designer/hooks";
import { computed, defineComponent, inject } from "vue";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { defaultEvents } from "./constant";
import { EventSetting } from "@cgx-designer/private-materials";
const ElementEvent = defineComponent({
  setup() {
    const elementConfigMap = elementController.elementConfigMap;
    const formManager = inject("formManager") as FormManage;
    const focusManager = inject("focusManager") as FocusManage;
    const queueManager = inject("queueManager") as QueueManage;
    const focusedElement = computed(() => {
      return focusManager.focusedElement.value;
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
            focusedElement.value || formManager.formSetting,
            `on`
          )}
          onUpdateModelValue={(v: any) => {
            setValueByPath(
              focusedElement.value || formManager.formSetting,
              `on`,
              v
            );
            queueManager.push("elementEvent");
          }}
        />
      </div>
    );
  },
});

export default ElementEvent;
