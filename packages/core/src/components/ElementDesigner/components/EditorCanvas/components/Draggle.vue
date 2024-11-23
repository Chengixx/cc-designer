<script setup lang="ts">
import draggable from "vuedraggable";
import { FocusManage } from "@cgx-designer/hooks";
import EditorElement from "./EditorElement";
import { useDrag } from "@cgx-designer/hooks";
import { inject } from "vue";
import { HoverManage } from "@cgx-designer/hooks";
import { IEditorElement } from "../../../../../types";
import { needMarginBottomDomList } from "../../../../../constant";
defineOptions({
  name: "Draggle",
});
const emits = defineEmits(["drop"]);
const props = defineProps<{
  elementSchemaList: IEditorElement[];
  isNested: boolean;
}>();
const hoverManage = inject("hoverManage") as HoverManage;
const focusManage = inject("focusManage") as FocusManage;
const { handleDropStart, handleDropEnd } = useDrag();
const _needMarginBottom = (elementSchema: IEditorElement) => {
  return needMarginBottomDomList.includes(elementSchema.key);
};
const handleAdd = (index: number) => {
  //Todo这其实是一个设计上的失误 导致必须在这里进行异步 确保另一边加上数据了
  setTimeout(() => {
    focusManage.handleFocus(props.elementSchemaList[index]);
  }, 0);
};
</script>

<template>
  <draggable
    :list="props.elementSchemaList"
    v-bind="{
      group: { name: 'draggable' },
      animation: 180,
      ghostClass: 'moving',
    }"
    :class="
      props.isNested
        ? 'min-h-[60px] border-dashed border border-[#d9d9d9] h-full'
        : 'min-h-[calc(100vh-100px)] w-full bg-white'
    "
    @start="() => handleDropStart(hoverManage, focusManage)"
    @end="() => handleDropEnd(hoverManage, focusManage)"
    @add="(e: any) => handleAdd(e.newIndex)"
    @dragover.prevent
    item-key="id"
  >
    <template #item="{ element }">
      <div
        :class="[
          _needMarginBottom(element) ? 'mb-0' : 'mb-4',
          element.key === 'row' ? 'border border-[#d9d9d9] border-dashed' : '',
          element.key === 'divider' ? 'inline-block' : '',
          'editor-element-item',
        ]"
        :key="element.id"
      >
        <EditorElement :elementSchema="element" />
      </div>
    </template>
  </draggable>
</template>

<style scoped>
.editor-element-item {
  width: 100%;
}
.editor-element-item:first-child {
  margin-top: 0;
}
.editor-element-item::hover {
  /* background-color: #336699; */
  background-color: #3b82f6;
}
</style>
