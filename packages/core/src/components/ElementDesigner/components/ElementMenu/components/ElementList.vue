<script setup lang="ts">
import draggable from "vuedraggable";
import SvgIcon from "../../../../SvgIcon";
import { inject } from "vue";
import { ElementConfig, IElementBaseSetting } from "@cgx-designer/utils";
import { v4 as uuid } from "uuid";
import { useDrag } from "@cgx-designer/hooks";
import { HoverManage } from "@cgx-designer/hooks";
const hoverManage = inject("hoverManage") as HoverManage;
const elementConfig = inject<ElementConfig>("elementConfig");
const commands: Record<string, Function> | undefined = inject("commands");
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
  <draggable
    v-model="elementConfig!.elementList"
    v-bind="{
      group: { name: 'draggable', pull: 'clone', put: false },
      sort: false,
      animation: 180,
      ghostClass: 'moving',
    }"
    @start="(e) => handleDropStart(hoverManage)"
    @end="(e) => handleDropEnd(hoverManage)"
    :clone="(e:any) => handleClone(e)"
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

<style scoped></style>
