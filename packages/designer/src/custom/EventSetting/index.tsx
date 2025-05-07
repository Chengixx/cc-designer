import { EventInstance, EventItem, EventPrototype } from "@cgx-designer/types";
import { computed, defineComponent, PropType, ref, toRaw } from "vue";
import EventSettingItem from "./components/EventSettingItem.vue";
import EventSettingDialog from "./components/EventSettingDialog";
import AddEventButton from "./components/AddEventButton";
import { Empty } from "@cgx-designer/extensions";

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
    //有实例的事件
    const hasInstanceEventList = computed(() => {
      return props.eventList
        .map((item: { events: EventItem[] }) => item.events)
        .flat()
        .filter((item: EventItem) => bindValue.value?.[item.type]?.length);
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
        <AddEventButton
          eventList={props.eventList}
          onAddEvent={(type: string) => handleOpenEventDialog("add", type)}
        />
        {hasInstanceEventList.value.length ? (
          <EventSettingItem
            v-model={bindValue.value}
            eventItem={hasInstanceEventList.value}
            onAddEvent={(type: string) => handleOpenEventDialog("add", type)}
            onEditEvent={(type: string, index: number, eventInstance: any) =>
              handleOpenEventDialog("edit", type, index, eventInstance)
            }
            events={events.value}
            allEventList={allEventList.value}
          />
        ) : (
          <Empty />
        )}

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
