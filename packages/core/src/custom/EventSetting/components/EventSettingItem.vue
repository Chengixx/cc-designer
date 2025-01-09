<script setup lang="ts">
import { elementController } from "@cgx-designer/controller";
import { computed, inject, PropType } from "vue";
import draggable from "vuedraggable";
import { ElementManage } from "@cgx-designer/hooks";
import SvgIcon from "../../../components/SvgIcon/index";
import { EventInstance, EventItem } from "../../../types/index";
import { VBtnColorType } from "@cgx-designer/materials";

const Button = elementController.getElementRender("button");
const elementManage = inject("elementManage") as ElementManage;
const props = defineProps({
  //用于循环渲染的事件item
  eventItem: {
    type: Array as PropType<EventItem[]>,
    required: true,
  },
  modelValue: {
    type: Object as PropType<any>,
  },
  //已经有的事件
  events: {
    type: Object as PropType<any>,
  },
  //所有的事件 用于删除的时候
  allEventList: {
    type: Array as PropType<any>,
    default: () => [],
  },
});

const emit = defineEmits(["addEvent", "editEvent", "update:modelValue"]);

//新增事件
const handleAddEvent = (type: string) => {
  emit("addEvent", type);
};
//编辑事件
const handleEditEvent = (
  index: number,
  type: string,
  eventInstance: EventInstance
) => {
  emit("editEvent", type, index, eventInstance);
};
//删除事件
const handleDeleteEvent = (index: number, type: string) => {
  const newEvents = getNewEvents(type);
  newEvents[type] = props.events[type].filter(
    (_: any, i: number) => index !== i
  );
  if (!newEvents[type]?.length) {
    delete newEvents[type];
  }
  emit("update:modelValue", newEvents);
};

const getNewEvents = (type: string) => {
  const newEvents: { [type: string]: any } = {};
  props.allEventList.forEach((item: any) => {
    if (!props.events[item.type].length) {
      return false;
    }
    if (item.type === type) {
      return false;
    }
    newEvents[item.type] = props.events[item.type];
  });
  return newEvents;
};

const getElementSetting = (id: string) => {
  const key = elementManage.findElementById(id)!.key;
  const baseSetting = elementController.elementList.value.find(
    (item) => item.key === key
  );
  return baseSetting;
};

const getElementSvg = (tag: string) => {
  return elementController!.elementConfigMap[tag].icon;
};

const isVuetify = computed(() => {
  return elementController.getCurrentElementLibrary() === "vuetify";
});

const computedButtonColor = (type: keyof typeof VBtnColorType) => {
  if (isVuetify.value) {
    return VBtnColorType[type];
  } else {
    return undefined;
  }
};
</script>

<template>
  <div v-for="item in eventItem" :key="item.type">
    <!-- item的上面 也就是个体 -->
    <div
      class="c-h-10 c-w-full c-border c-flex c-items-center c-justify-between c-rounded-md c-mt-1 c-bg-gray-50 dark:c-bg-darkMode dark:c-border-darkMode"
    >
      <div class="c-ml-2">{{ item.describe }}</div>
      <div class="c-mr-2">
        <Button
          link
          variant="text"
          :color="computedButtonColor('primary')"
          type="primary"
          @click="handleAddEvent(item.type)"
          >新增</Button
        >
      </div>
    </div>
    <!-- 下面的方法 用draggle是因为这样可以拖拽循环 -->
    <div>
      <draggable
        v-model="props.events[item.type]"
        item-key="id"
        :component-data="{
          type: 'transition-group',
        }"
        group="option-list"
        :animation="200"
      >
        <template #item="{ element: eventInstance, index }">
          <div
            class="c-p-2 c-rounded-md c-border c-flex c-items-center c-my-2 hover:c-border-blue-500 c-transition-all dark:c-border-darkMode dark:hover:c-border-blue-500"
          >
            <div class="c-flex-1">
              <div v-if="eventInstance.type === 'custom'">自定义函数</div>
              <div
                class="c-flex c-items-center c-gap-1"
                v-if="eventInstance.type === 'component'"
              >
                <template
                  v-if="
                    typeof getElementSetting(eventInstance.componentId)
                      ?.icon === 'string'
                  "
                >
                  <SvgIcon
                    :name="getElementSetting(eventInstance.componentId)!.icon!"
                  />
                </template>
                <template v-else>
                  <component
                    class="c-w-[16px] c-h-[16px]"
                    :is="
                      getElementSvg(
                        getElementSetting(eventInstance.componentId)!.key
                      )
                    "
                  />
                </template>

                <span>{{
                  getElementSetting(eventInstance.componentId)!.label
                }}</span>
              </div>
              <div>
                {{ eventInstance.componentId }}
              </div>
              <div>
                {{ eventInstance.methodName }}
              </div>
            </div>
            <Button
              link
              variant="text"
              type="primary"
              :color="computedButtonColor('primary')"
              @click="handleEditEvent(index, item.type, eventInstance)"
              >编辑</Button
            >
            <Button
              link
              variant="text"
              type="danger"
              :color="computedButtonColor('danger')"
              @click="handleDeleteEvent(index, item.type)"
              >删除</Button
            >
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped></style>
