<script setup lang="ts">
import { Ripple } from "@cgx-designer/extensions";
import draggable from "vuedraggable";
import { computed, inject } from "vue";
import { getRandomId } from "@cgx-designer/utils";
import {
  IElementBaseSetting,
  elementController,
} from "@cgx-designer/controller";
import { useDrag, HoverManage } from "@cgx-designer/hooks";
import { ElementListBarItem, ElementListBoxItem } from "./ElementListItem";

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
//搜索过后用于渲染的
const renderElementList = computed(() => {
  return elementController!.elementList.value.filter((item) => {
    return item.label.includes(props.searchValue);
  });
});
//渲染的模式
const renderElementListMode = computed(() => {
  return elementController!.elementListMode.value;
});

const { handleDropStart, handleDropEnd } = useDrag();
const handleClone = (elementBaseSetting: IElementBaseSetting) => {
  const newElement = elementBaseSetting.template(getRandomId);
  return newElement;
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
      :class="[
        renderElementListMode === 'bar' &&
          'c-grid c-grid-cols-2 c-px-[14px] c-gap-x-2',
        renderElementListMode === 'box' && 'c-grid c-grid-cols-3',
      ]"
    >
      <template #item="{ element, index }">
        <component
          :is="
            renderElementListMode === 'bar'
              ? ElementListBarItem
              : ElementListBoxItem
          "
          :element="element"
          :index="index"
        />
      </template>
    </draggable>
  </template>
</template>

<style scoped></style>
