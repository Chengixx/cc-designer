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
  const key = elementManage.getElementById(id)!.key;
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
  <div v-for="item in eventItem" :key="item.type" class="c-mb-6">
    <!-- item的上面 也就是个体 -->
    <div
      class="c-h-12 c-w-full c-border c-border-gray-200 c-rounded-lg c-flex c-items-center c-justify-between c-text-sm c-font-medium c-bg-gradient-to-r c-from-gray-50 c-to-gray-100 dark:c-from-gray-800 dark:c-to-gray-700 dark:c-border-gray-600 dark:c-text-gray-100 c-shadow-sm"
    >
      <div class="c-ml-4 c-flex c-items-center c-gap-2">
        <div class="c-w-2 c-h-2 c-bg-blue-500 c-rounded-full"></div>
        <span class="c-text-gray-700 dark:c-text-gray-200">{{
          item.describe
        }}</span>
      </div>
      <div class="c-mr-4">
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
    <div class="c-mt-3">
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
            class="c-p-4 c-flex c-items-center c-my-2 c-text-sm c-bg-white c-border c-border-gray-200 c-rounded-lg hover:c-bg-gray-50 hover:c-border-blue-300 c-transition-all c-duration-200 c-shadow-sm hover:c-shadow-md dark:c-bg-gray-800 dark:c-border-gray-600 dark:hover:c-bg-gray-700 dark:hover:c-border-blue-400 c-cursor-move"
          >
            <div
              class="c-flex-1 c-flex c-justify-start c-items-center c-gap-x-3 c-select-none"
            >
              <div
                class="c-flex c-items-center c-gap-2 c-px-3 c-py-1 c-bg-blue-100 c-text-blue-700 c-rounded-full c-text-xs c-font-medium dark:c-bg-blue-900 dark:c-text-blue-200"
                v-if="eventInstance.type === 'custom'"
              >
                <CustomIcon class="c-w-4 c-h-4 dark:c-fill-white" />
                自定义事件
              </div>
              <div
                class="c-flex c-items-center c-gap-2 c-px-3 c-py-1 c-bg-green-100 c-text-green-700 c-rounded-full c-text-xs c-font-medium dark:c-bg-green-900 dark:c-text-green-200"
                v-if="eventInstance.type === 'global'"
              >
                <GlobalIcon class="c-w-4 c-h-4 dark:c-fill-white" />
                全局事件
              </div>
              <div
                class="c-flex c-items-center c-gap-2 c-px-3 c-py-1 c-bg-purple-100 c-text-purple-700 c-rounded-full c-text-xs c-font-medium dark:c-bg-purple-900 dark:c-text-purple-200"
                v-if="eventInstance.type === 'component'"
              >
                <template
                  v-if="
                    typeof getElementSetting(eventInstance.componentId)
                      ?.icon === 'string'
                  "
                >
                  <SvgIcon
                    :name="getElementSetting(eventInstance.componentId)?.icon"
                    class="c-w-4 c-h-4 dark:c-fill-white"
                  />
                </template>
                <template v-else>
                  <component
                    class="c-w-4 c-h-4 dark:c-fill-white"
                    :is="
                      getElementSvg(
                        getElementSetting(eventInstance.componentId)?.key
                      )
                    "
                  />
                </template>

                <span class="c-font-medium">{{
                  getElementSetting(eventInstance.componentId)?.label
                }}</span>
              </div>
              <div
                class="c-text-gray-500 dark:c-text-gray-400 c-font-mono c-text-xs"
              >
                {{ eventInstance.componentId }}
              </div>
              <div class="c-text-gray-700 dark:c-text-gray-200 c-font-medium">
                {{ eventInstance.methodName }}
              </div>
            </div>
            <div class="c-flex c-items-center c-gap-2 c-ml-4">
              <EditIcon
                title="编辑"
                @click="handleEditEvent(index, item.type, eventInstance)"
                class="c-h-5 c-w-5 c-fill-gray-400 hover:c-fill-blue-500 dark:c-fill-gray-500 dark:hover:c-fill-blue-400 c-cursor-pointer c-transition-colors c-duration-200 c-p-1 c-rounded hover:c-bg-blue-50 dark:hover:c-bg-blue-900/20"
              />
              <ClearIcon
                title="删除"
                @click="handleDeleteEvent(index, item.type)"
                class="c-h-5 c-w-5 c-fill-gray-400 hover:c-fill-red-500 dark:c-fill-gray-500 dark:hover:c-fill-red-400 c-cursor-pointer c-transition-colors c-duration-200 c-p-1 c-rounded hover:c-bg-red-50 dark:hover:c-bg-red-900/20"
              />
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped></style>
