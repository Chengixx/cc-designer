<script setup lang="ts">
import {
  EditIcon,
  ClearIcon,
  CustomIcon,
  GlobalIcon,
} from "@cgx-designer/icons";
import { elementController } from "@cgx-designer/controller";
import { computed, inject, PropType } from "vue";
import draggable from "vuedraggable";
import { ElementManage } from "@cgx-designer/hooks";
import { SvgIcon } from "@cgx-designer/extensions";
import { EventInstance, EventItem } from "@cgx-designer/types";
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
  const baseSetting = elementController.getElementConfig(key);
  return baseSetting;
};

const getElementSvg = (tag: string) => {
  return elementController!.elementConfigMap[tag].icon;
};

const isVuetify = computed(() => {
  return elementController.getCurrentElementLibraryName() === "vuetify";
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
      class="c-h-10 c-w-full c-border-y c-flex c-items-center c-justify-between c-text-xs c-mt-1 c-bg-gray-50 dark:c-bg-darkMode dark:c-border-darkMode"
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
            class="c-p-1 c-flex c-items-center c-my-1 c-text-sm hover:c-bg-gray-100 c-transition-all dark:c-border-darkMode dark:hover:c-bg-gray-700"
          >
            <div
              class="c-flex-1 c-flex c-justify-start c-items-center c-gap-x-1 c-select-none"
            >
              <div
                class="c-flex c-items-center c-gap-1"
                v-if="eventInstance.type === 'custom'"
              >
                <CustomIcon class="c-w-[16px] c-h-[16px] dark:c-fill-white" />
                自定义事件
              </div>
              <div
                class="c-flex c-items-center c-gap-1"
                v-if="eventInstance.type === 'global'"
              >
                <GlobalIcon class="c-w-[16px] c-h-[16px] dark:c-fill-white" />
                全局事件
              </div>
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
                    class="c-w-[16px] c-h-[16px] dark:c-fill-white"
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
            <EditIcon
              title="编辑"
              @click="handleEditEvent(index, item.type, eventInstance)"
              class="c-h-4 c-w-4 c-mr-1 dark:c-fill-white hover:c-fill-blue-500 dark:hover:c-fill-blue-500 c-cursor-pointer"
            />
            <ClearIcon
              title="删除"
              @click="handleDeleteEvent(index, item.type)"
              class="c-h-4 c-w-4 dark:c-fill-white hover:c-fill-blue-500 dark:hover:c-fill-blue-500 c-cursor-pointer"
            />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped></style>
