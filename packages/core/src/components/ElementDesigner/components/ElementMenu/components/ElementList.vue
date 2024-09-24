<script setup lang="ts">
import draggable from "vuedraggable";
import SvgIcon from "../../../../SvgIcon";
import { computed, inject } from "vue";
import { ElementConfig, IElementBaseSetting } from "@cgx-designer/utils";
import { v4 as uuid } from "uuid";
import { useDrag } from "@cgx-designer/hooks";
import { HoverManage } from "@cgx-designer/hooks";

const props = defineProps({
  searchValue: { type: String, default: "", required: true },
});
const hoverManage = inject("hoverManage") as HoverManage;
const elementConfig = inject<ElementConfig>("elementConfig");
const commands: Record<string, Function> | undefined = inject("commands");
//搜索过后用于渲染的
const renderElementList = computed(() => {
  return elementConfig!.elementList.filter((item) => {
    return item.label.includes(props.searchValue);
  });
});

const handleClick = (element: IElementBaseSetting) => {
  commands!.addFromLast(element);
};
const { handleDropStart, handleDropEnd } = useDrag();
const handleClone = (e: any) => {
  const newElement = e.template(uuid);
  return newElement;
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
      @start="(e) => handleDropStart(hoverManage)"
      @end="(e) => handleDropEnd(hoverManage)"
      :clone="(e: any) => handleClone(e)"
      item-key="id"
      class="grid grid-cols-[auto_auto] px-[10px] gap-2"
    >
      <template #item="{ element }">
        <div
          class="relative w-[116px] h-[36px] mt-2 flex justify-start items-center py-1 px-[8px] bg-white box-border cursor-move select-none rounded border border-[#d9d9d9] hover:border-blue-500 hover:bg-[#f4f8fe]"
          @click="handleClick(element)"
        >
          <SvgIcon :name="element.icon" />
          <span class="text-sm ml-1">{{ element.label }}</span>
        </div>
      </template>
    </draggable>
  </template>
</template>

<style scoped></style>
