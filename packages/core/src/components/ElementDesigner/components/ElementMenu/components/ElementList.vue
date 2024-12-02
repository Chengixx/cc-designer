<script setup lang="ts">
import draggable from "vuedraggable";
import SvgIcon from "../../../../SvgIcon";
import { computed, inject, ref } from "vue";
import { getRandomId } from "@cgx-designer/utils";
import {
  IElementBaseSetting,
  elementController,
} from "@cgx-designer/controller";
import { useDrag, HoverManage } from "@cgx-designer/hooks";

const props = defineProps({
  searchValue: { type: String, default: "", required: true },
});
const hoverManage = inject("hoverManage") as HoverManage;
const commands: Record<string, Function> | undefined = inject("commands");
//搜索过后用于渲染的
const renderElementList = computed(() => {
  return elementController!.elementList.filter((item) => {
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
  return elementController!.elementMap[tag].icon;
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
    <div class="w-full flex justify-center items-center text-gray-400 mt-10">
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
      class="grid grid-cols-[auto_auto] px-[10px] gap-2"
    >
      <template #item="{ element, index }">
        <div
          class="relative w-[116px] h-[36px] mt-2 flex justify-start items-center py-1 px-[8px] bg-white box-border cursor-move select-none rounded border border-[#d9d9d9] hover:border-blue-500 hover:bg-[#f4f8fe] dark:bg-darkMode dark:hover:bg-[#272b32] dark:border-darkMode"
          @click="handleClick(element)"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
        >
          <template v-if="typeof element.icon === 'string'">
            <SvgIcon
              :name="element.icon"
              :class="[
                { 'fill-blue-500 dark:fill-blue-500': hoverIndex === index },
                { 'dark:fill-white': hoverIndex !== index },
              ]"
            />
          </template>
          <template v-else>
            <component
              :class="[
                'w-[16px] h-[16px]',
                { 'fill-blue-500 dark:fill-blue-500': hoverIndex === index },
                { 'dark:fill-white': hoverIndex !== index },
              ]"
              :is="getElementSvg(element.key)"
            />
          </template>
          <span
            :class="['text-sm ml-1', { 'text-blue-500': hoverIndex === index }]"
            >{{ element.label }}</span
          >
        </div>
      </template>
    </draggable>
  </template>
</template>

<style scoped></style>
