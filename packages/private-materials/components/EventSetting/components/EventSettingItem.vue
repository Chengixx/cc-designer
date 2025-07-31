<script setup lang="ts">
import {
  EditIcon,
  ClearIcon,
  CustomIcon,
  GlobalIcon,
  RightIcon,
  AddIcon,
  QuestionMarkIcon,
} from "@cgx-designer/icons";
import { elementController } from "@cgx-designer/controller";
import { inject, PropType, ref } from "vue";
import draggable from "vuedraggable";
import { ElementManage } from "@cgx-designer/hooks";
import { SvgIcon, CTooltip } from "@cgx-designer/extensions";
import { EventInstance, EventItem } from "@cgx-designer/types";
import { computedButtonColor } from "@cgx-designer/utils";

const Button = elementController.getElementRender("button");
const elementManager = inject("elementManager") as ElementManage;

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

// 折叠状态管理
const collapsedSections = ref<Set<string>>(new Set());

// 每个item的hover状态管理
const hoveredItemId = ref<string | null>(null);

// 切换折叠状态
const toggleSection = (type: string) => {
  if (collapsedSections.value.has(type)) {
    collapsedSections.value.delete(type);
  } else {
    collapsedSections.value.add(type);
  }
};

// 检查是否折叠
const isCollapsed = (type: string) => collapsedSections.value.has(type);

// 获取事件数量
const getEventCount = (type: string) => {
  return props.events[type]?.length || 0;
};

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
  const key = elementManager.getElementById(id)!.key;
  const baseSetting = elementController.getElementConfig(key);
  return baseSetting;
};

const getElementSvg = (tag: string) => {
  return elementController!.elementConfigMap[tag].icon;
};

// 获取事件类型图标和颜色
const getEventTypeConfig = (type: string) => {
  switch (type) {
    case "custom":
      return {
        icon: CustomIcon,
        bgColor: "c-bg-blue-50 dark:c-bg-blue-900/20",
        textColor: "c-text-blue-700 dark:c-text-blue-300",
        borderColor: "c-border-blue-200 dark:c-border-blue-700",
        label: "自定义事件",
      };
    case "global":
      return {
        icon: GlobalIcon,
        bgColor: "c-bg-green-50 dark:c-bg-green-900/20",
        textColor: "c-text-green-700 dark:c-text-green-300",
        borderColor: "c-border-green-200 dark:c-border-green-700",
        label: "全局事件",
      };
    case "component":
      return {
        icon: null,
        bgColor: "c-bg-purple-50 dark:c-bg-purple-900/20",
        textColor: "c-text-purple-700 dark:c-text-purple-300",
        borderColor: "c-border-purple-200 dark:c-border-purple-700",
        label: "组件事件",
      };
    default:
      return {
        icon: null,
        bgColor: "c-bg-gray-50 dark:c-bg-gray-900/20",
        textColor: "c-text-gray-700 dark:c-text-gray-300",
        borderColor: "c-border-gray-200 dark:c-border-gray-700",
        label: "事件",
      };
  }
};

// 处理每个item的hover状态
const handleItemMouseEnter = (itemId: string) => {
  hoveredItemId.value = itemId;
};

const handleItemMouseLeave = () => {
  hoveredItemId.value = null;
};

// 检查指定item是否处于hover状态
const isItemHovered = (itemId: string) => {
  return hoveredItemId.value === itemId;
};
</script>

<template>
  <div class="c-space-y-4">
    <div
      v-for="item in eventItem"
      :key="item.type"
      class="c-bg-white dark:c-bg-gray-800 c-rounded-xl c-border c-border-gray-200 dark:c-border-gray-700 c-shadow-sm c-overflow-hidden"
    >
      <!-- 可折叠的标题栏 -->
      <div
        class="c-flex c-items-center c-justify-between c-p-4 c-cursor-pointer c-transition-all c-duration-200 hover:c-bg-gray-50 dark:hover:c-bg-gray-700"
        @click="toggleSection(item.type)"
      >
        <div class="c-flex c-items-center c-gap-3">
          <div
            class="c-w-5 c-h-5 c-flex c-items-center c-justify-center c-transition-transform c-duration-200"
            :class="{ 'c-rotate-90': !isCollapsed(item.type) }"
          >
            <RightIcon
              class="c-w-4 c-h-4 c-text-gray-500 dark:c-text-gray-400"
            />
          </div>
          <div class="c-flex c-items-center c-gap-2">
            <div class="c-w-2 c-h-2 c-bg-blue-500 c-rounded-full"></div>
            <span class="c-font-medium c-text-gray-900 dark:c-text-gray-100">{{
              item.describe
            }}</span>
          </div>
          <div
            class="c-px-2 c-py-1 c-bg-blue-100 dark:c-bg-blue-900/30 c-text-blue-700 dark:c-text-blue-300 c-text-xs c-font-medium c-rounded-full"
          >
            {{ getEventCount(item.type) }}
          </div>
        </div>

        <div class="c-flex c-items-center c-gap-2">
          <Button
            link
            variant="text"
            :color="computedButtonColor('primary')"
            type="primary"
            @click.stop="handleAddEvent(item.type)"
          >
            新增
          </Button>
        </div>
      </div>

      <!-- 可折叠的内容区域 -->
      <div
        v-show="!isCollapsed(item.type)"
        class="c-border-t c-border-gray-200 dark:c-border-gray-700 c-transition-all c-duration-300"
      >
        <div class="c-p-4 c-space-y-3">
          <!-- 空状态 -->
          <div
            v-if="!getEventCount(item.type)"
            class="c-text-center c-py-8 c-text-gray-500 dark:c-text-gray-400"
          >
            <div
              class="c-w-12 c-h-12 c-mx-auto c-mb-3 c-bg-gray-100 dark:c-bg-gray-700 c-rounded-full c-flex c-items-center c-justify-center"
            >
              <AddIcon class="c-w-6 c-h-6 c-text-gray-400" />
            </div>
            <p class="c-text-sm">暂无{{ item.describe }}，点击上方按钮添加</p>
          </div>

          <!-- 事件列表 -->
          <draggable
            v-else
            v-model="props.events[item.type]"
            item-key="id"
            :component-data="{
              type: 'transition-group',
            }"
            group="option-list"
            :animation="300"
            class="c-space-y-2"
          >
            <template #item="{ element: eventInstance, index }">
              <div
                class="c-group c-relative c-bg-gray-50 dark:c-bg-gray-700/50 c-border c-border-gray-200 dark:c-border-gray-600 c-rounded-lg c-p-4 c-transition-all c-duration-200 hover:c-bg-white dark:hover:c-bg-gray-700 hover:c-border-blue-300 dark:hover:c-border-blue-500 hover:c-shadow-md c-cursor-move"
                @mouseenter="handleItemMouseEnter(`${item.type}-${index}`)"
                @mouseleave="handleItemMouseLeave()"
              >
                <!-- 拖拽指示器 -->
                <div
                  class="c-absolute c-left-2 c-top-1/2 c-transform c--translate-y-1/2 c-opacity-0 group-hover:c-opacity-100 c-transition-opacity c-duration-200"
                >
                  <div
                    class="c-w-1 c-h-8 c-bg-gray-300 dark:c-bg-gray-500 c-rounded-full"
                  ></div>
                </div>

                <div class="c-flex c-items-center c-gap-4 c-ml-4">
                  <!-- 事件类型标签 -->
                  <div
                    class="c-flex c-items-center c-gap-2 c-px-3 c-py-1.5 c-rounded-full c-text-xs c-font-medium c-border c-whitespace-nowrap c-flex-shrink-0"
                    :class="[
                      getEventTypeConfig(eventInstance.type).bgColor,
                      getEventTypeConfig(eventInstance.type).textColor,
                      getEventTypeConfig(eventInstance.type).borderColor,
                    ]"
                  >
                    <component
                      v-if="getEventTypeConfig(eventInstance.type).icon"
                      :is="getEventTypeConfig(eventInstance.type).icon"
                      class="c-w-3 c-h-3 dark:c-fill-current"
                    />
                    <template v-else-if="eventInstance.type === 'component'">
                      <template
                        v-if="
                          typeof getElementSetting(eventInstance.componentId)
                            ?.icon === 'string'
                        "
                      >
                        <SvgIcon
                          :name="
                            getElementSetting(eventInstance.componentId)?.icon
                          "
                          class="c-w-3 c-h-3 dark:c-fill-current"
                        />
                      </template>
                      <template v-else>
                        <component
                          class="c-w-3 c-h-3 dark:c-fill-current"
                          :is="
                            getElementSvg(
                              getElementSetting(eventInstance.componentId)?.key
                            )
                          "
                        />
                      </template>
                    </template>
                    <span>{{
                      getEventTypeConfig(eventInstance.type).label
                    }}</span>
                    <!-- 组件事件信息图标 -->
                    <CTooltip
                      v-if="eventInstance.type === 'component'"
                      :tooltip="`${getElementSetting(eventInstance.componentId)?.label} (#${eventInstance.componentId})`"
                      placement="top"
                    >
                      <div
                        class="c-w-4 c-h-5 c-flex c-items-center c-justify-center"
                      >
                        <QuestionMarkIcon
                          class="c-w-3 c-h-3 c-cursor-help c-opacity-60 hover:c-opacity-100 c-transition-opacity c-flex c-items-center c-justify-center"
                        />
                      </div>
                    </CTooltip>
                  </div>

                  <!-- 事件信息 -->
                  <div
                    v-if="!isItemHovered(`${item.type}-${index}`)"
                    class="c-flex-1 c-min-w-0"
                  >
                    <!-- 组件事件使用三行布局 -->
                    <div
                      v-if="eventInstance.type === 'component'"
                      class="c-flex c-flex-col"
                    >
                      <span
                        class="c-text-xs c-text-gray-900 dark:c-text-gray-100 c-font-medium c-truncate"
                      >
                        {{ eventInstance.methodName }}
                      </span>
                      <span
                        class="c-text-xs c-text-gray-600 dark:c-text-gray-400 c-truncate"
                      >
                        {{
                          getElementSetting(eventInstance.componentId)?.label
                        }}
                      </span>
                    </div>
                    <!-- 其他事件使用水平布局 -->
                    <div
                      v-else
                      class="c-flex c-items-center c-justify-end c-gap-2"
                    >
                      <span
                        class="c-text-xs c-text-gray-900 dark:c-text-gray-100 c-font-mono c-truncate"
                      >
                        {{ eventInstance.methodName }}
                      </span>
                      <span
                        class="c-text-xs c-text-gray-500 dark:c-text-gray-400 c-font-mono c-truncate"
                      >
                        {{ eventInstance.componentId }}
                      </span>
                    </div>
                  </div>

                  <!-- 操作按钮 - 固定在右侧 -->
                  <div
                    v-if="isItemHovered(`${item.type}-${index}`)"
                    class="c-flex c-items-center c-gap-1 c-ml-auto c-flex-shrink-0"
                  >
                    <button
                      @click="handleEditEvent(index, item.type, eventInstance)"
                      class="c-p-1 c-fill-gray-400 hover:c-fill-blue-500 dark:c-fill-gray-500 dark:hover:c-fill-blue-400 c-transition-colors c-duration-200 c-rounded-md hover:c-bg-blue-50 dark:hover:c-bg-blue-900/20"
                      title="编辑"
                    >
                      <EditIcon class="c-w-4 c-h-4" />
                    </button>
                    <button
                      @click="handleDeleteEvent(index, item.type)"
                      class="c-p-1 c-fill-gray-400 hover:c-fill-red-500 dark:c-fill-gray-500 dark:hover:c-fill-red-400 c-transition-colors c-duration-200 c-rounded-md hover:c-bg-red-50 dark:hover:c-bg-red-900/20"
                      title="删除"
                    >
                      <ClearIcon class="c-w-4 c-h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义过渡动画 */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 拖拽时的样式 */
.sortable-ghost {
  opacity: 0.5;
}

.sortable-chosen {
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
}
</style>
