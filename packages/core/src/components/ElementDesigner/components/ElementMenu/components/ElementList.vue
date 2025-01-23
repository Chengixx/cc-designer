<script setup lang="ts">
import { Ripple } from "@cgx-designer/extensions";
import draggable from "vuedraggable";
import SvgIcon from "../../../../SvgIcon";
import { computed, inject, ref } from "vue";
import { getRandomId } from "@cgx-designer/utils";
import {
  IElementBaseSetting,
  elementController,
} from "@cgx-designer/controller";
import { useDrag, HoverManage } from "@cgx-designer/hooks";

//注册指令
defineExpose({
  directives: {
    ripple: Ripple,
  },
});

const props = defineProps({
  searchValue: { type: String, default: "", required: true },
});
const hoverManage = inject("hoverManage") as HoverManage;
const commands: Record<string, Function> | undefined = inject("commands");
//搜索过后用于渲染的
const renderElementList = computed(() => {
  return elementController!.elementList.value.filter((item) => {
    return item.label.includes(props.searchValue);
  });
});

const handleClick = (element: IElementBaseSetting) => {
  const newElementSchema = element.template(getRandomId);
  commands!.handleLastAdd(newElementSchema);
  // focusManage.handleFocus(newElementSchema);
};
const { handleDropStart, handleDropEnd } = useDrag();
const handleClone = (elementBaseSetting: IElementBaseSetting) => {
  const newElement = elementBaseSetting.template(getRandomId);
  return newElement;
};

const getElementSvg = (tag: string) => {
  return elementController!.elementConfigMap[tag].icon;
};

const hoverIndex = ref<number>(-1);

const handleMouseEnter = (index: number) => {
  hoverIndex.value = index;
};

const handleMouseLeave = () => {
  hoverIndex.value = -1;
};
</script>

<template>
  <template v-if="!renderElementList.length">
    <div
      class="c-w-full c-flex c-justify-center c-items-center c-text-gray-400 c-mt-10"
    >
      无此关键字组件
    </div>
  </template>
  <template v-else>
    <draggable
      v-model="renderElementList"
      v-bind="{
        group: { name: 'draggable', pull: 'clone', put: false },
        sort: false,
        animation: 180,
        ghostClass: 'moving',
      }"
      @start="() => handleDropStart(hoverManage)"
      @end="() => handleDropEnd(hoverManage)"
      :clone="
        (elementBaseSetting: IElementBaseSetting) =>
          handleClone(elementBaseSetting)
      "
      item-key="id"
      class="c-grid c-grid-cols-[auto_auto] c-px-[14px] c-gap-2"
    >
      <template #item="{ element, index }">
        <div
          class="c-relative c-w-[130px] c-h-[36px] c-mt-2 c-flex c-justify-start c-items-center c-py-1 c-px-[8px] c-bg-white c-box-border c-cursor-move c-select-none c-rounded c-border c-border-[#d9d9d9] hover:c-border-blue-500 hover:c-bg-[#f4f8fe] dark:c-bg-darkMode dark:hover:c-bg-[#272b32] dark:c-border-darkMode"
          @click="handleClick(element)"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
          v-ripple="{ class: 'c-text-blue-300' }"
        >
          <template v-if="typeof element.icon === 'string'">
            <SvgIcon
              :name="element.icon"
              :class="[
                {
                  'c-fill-blue-500 dark:c-fill-blue-500': hoverIndex === index,
                },
                { 'dark:c-fill-white': hoverIndex !== index },
              ]"
            />
          </template>
          <template v-else>
            <component
              :class="[
                'c-w-[16px] c-h-[16px]',
                {
                  'c-fill-blue-500 dark:c-fill-blue-500': hoverIndex === index,
                },
                { 'dark:c-fill-white': hoverIndex !== index },
              ]"
              :is="getElementSvg(element.key)"
            />
          </template>
          <span
            :class="[
              'c-text-sm c-ml-1',
              { 'c-text-blue-500': hoverIndex === index },
            ]"
            >{{ element.label }}</span
          >
        </div>
      </template>
    </draggable>
  </template>
</template>

<style scoped></style>
