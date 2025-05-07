import { elementController } from "@cgx-designer/controller";
import { CTooltip } from "@cgx-designer/extensions";
import { EventPrototype } from "@cgx-designer/types";
import { defineComponent, PropType } from "vue";

const AddEventButton = defineComponent({
  props: {
    eventList: {
      type: Array as PropType<EventPrototype[]>,
      default: () => [],
    },
  },
  emits: ["addEvent"],
  setup(props, { emit }) {
    const Button = elementController.getElementRender("button");

    return () => (
      <CTooltip
        trigger="click"
        placement="bottom"
        maxWidth={"270px"}
        style={{ width: "100%", marginBottom: "8px" }}
        contentStyle={{ width: "100%" }}
        tooltipStyle={{ width: "270px", padding: "0px" }}
        bgColor="white"
      >
        {{
          tooltip: () => (
            <div class="c-text-black c-py-1">
              {props.eventList.map((eventItem, index) => {
                return (
                  <div>
                    {/* 如果不是第一个 可以来一个分割线 */}
                    {index !== 0 && (
                      <div class="c-h-[1px] c-w-full c-bg-gray-200 c-my-1" />
                    )}
                    <div class="c-text-sm c-font-medium c-p-2 c-select-none ">
                      {eventItem.title}
                    </div>
                    {/* 事件列表 */}
                    {eventItem.events.map((event) => {
                      return (
                        <div
                          onClick={() => {
                            emit("addEvent", event.type);
                          }}
                          class="c-h-8 c-pl-2 c-flex c-justify-start c-items-center c-cursor-pointer hover:c-bg-gray-200"
                        >
                          {event.describe}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ),
          default: () => (
            <Button
              type="primary"
              variant="tonal"
              block
              style={{ width: "100%" }}
            >
              新增事件
            </Button>
          ),
        }}
      </CTooltip>
    );
  },
});

export default AddEventButton;
