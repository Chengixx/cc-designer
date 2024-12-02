import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { ElEmpty } from "element-plus";
import { computed, defineComponent, inject } from "vue";
import { getValueByPath, setValueByPath } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { EventSetting } from "../../../../../custom";
import { defaultEvents } from "./constant";
const ElementEvent = defineComponent({
  setup() {
    const elementMap = elementController.elementMap;
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;

    const focusedElement = computed(() => {
      return focusManage.focusedElement.value;
    });

    const eventList = computed(() => {
      const elementEvents =
        elementMap[focusedElement.value!.key].config?.event ?? [];
      return elementEvents.length
        ? defaultEvents.concat({
            title: "组件事件",
            events: elementMap[focusedElement.value!.key].config?.event ?? [],
          })
        : defaultEvents;
    });

    return () => (
      <div>
        {focusedElement.value ? (
          <div>
            <EventSetting
              key={focusedElement.value.id}
              eventList={eventList.value}
              modelValue={getValueByPath(focusedElement.value!, `on`)}
              onUpdateModelValue={(v: any) => {
                setValueByPath(focusedElement.value!, `on`, v);
              }}
            />
          </div>
        ) : (
          <div>
            <ElEmpty description="暂无选中元素" />
          </div>
        )}
      </div>
    );
  },
});

export default ElementEvent;
