import { EventInstance, EventItem, EventPrototype } from "@cgx-designer/types";
import { Collapse, CollapseItem } from "@cgx-designer/extensions";
import { computed, defineComponent, PropType, ref, toRaw } from "vue";
import EventSettingItem from "./components/EventSettingItem.vue";
import EventSettingDialog from "./components/EventSettingDialog";

const EventSetting = defineComponent({
  props: {
    eventList: {
      type: Array as PropType<EventPrototype[]>,
      default: () => [],
    },
    modelValue: {
      type: Object as PropType<any>,
    },
  },
  emits: ["updateModelValue"],
  setup(props, { emit }) {
    const activeNames = ref<string[]>(
      props.eventList.map((item) => item.title)
    );
    const eventSettingDialogRef = ref<any>(null);
    //下面两个let是暂存 用于编辑和新增的时候的一个标识
    let currentType: string = "";
    let editIndex: number = 0;
    const bindValue = computed({
      get() {
        return props.modelValue;
      },
      set(nv) {
        emit("updateModelValue", nv);
      },
    });
    //所有的事件扁平化
    const allEventList = computed(() => {
      return props.eventList
        .map((item: { events: EventItem[] }) => item.events)
        .flat();
    });

    const events = ref<Record<string, any>>({});

    allEventList.value.forEach((item: EventItem) => {
      events.value[item.type] = computed({
        get() {
          return bindValue.value?.[item.type] ?? [];
        },
        set(e) {
          if (e && e.length) {
            bindValue.value[item.type] = e.map((itemm: any) => toRaw(itemm));
          } else {
            // 事件动作为空时，则清除该事件列表
            delete bindValue.value[item.type];
          }
        },
      });
    });

    // 添加事件 先打开dialog
    const handleOpenEventDialog = (
      flag: "add" | "edit",
      type: string,
      index?: number,
      eventInstance?: EventInstance
    ) => {
      if (flag === "add") {
        eventSettingDialogRef.value.handleOpen(flag);
      }
      if (flag === "edit") {
        eventSettingDialogRef.value.handleOpen(flag, eventInstance);
        //修改你要告诉我修改哪个
        editIndex = index!;
      }
      currentType = type;
    };
    //添加事件
    const handleAddEvent = (v: EventInstance) => {
      if (!bindValue.value) {
        bindValue.value = {
          [currentType]: [...(events.value[currentType] ?? []), v],
        };
        return;
      }

      bindValue.value[currentType] = [...(events.value[currentType] ?? []), v];
    };
    //修改事件
    const handleEditEvent = (v: EventInstance) => {
      events.value[currentType][editIndex] = v;
      bindValue.value[currentType] = [...(events.value[currentType] ?? [])];
    };
    return () => (
      <>
        <Collapse v-model={activeNames.value}>
          {props.eventList.map((eventItem) => {
            return (
              <CollapseItem
                title={eventItem.title}
                key={eventItem.title}
                name={eventItem.title}
              >
                <EventSettingItem
                  v-model={bindValue.value}
                  eventItem={eventItem.events}
                  onAddEvent={(type: string) =>
                    handleOpenEventDialog("add", type)
                  }
                  onEditEvent={(
                    type: string,
                    index: number,
                    eventInstance: any
                  ) =>
                    handleOpenEventDialog("edit", type, index, eventInstance)
                  }
                  events={events.value}
                  allEventList={allEventList.value}
                />
              </CollapseItem>
            );
          })}
        </Collapse>

        <EventSettingDialog
          ref={eventSettingDialogRef}
          onAdd={(v) => handleAddEvent(v)}
          onEdit={(v) => handleEditEvent(v)}
        />
      </>
    );
  },
});

export default EventSetting;
