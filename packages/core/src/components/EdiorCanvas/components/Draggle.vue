<script setup lang="ts">
import draggable from "vuedraggable";
import { FocusManage } from "@cgx-designer/hooks";
import EditorElement from "./EditorElement";
import { useDrag } from "@cgx-designer/hooks";
import { inject } from "vue";
import { HoverManage } from "@cgx-designer/hooks";
import { IEditorElement } from "@/types";
defineOptions({
  name: "Draggle",
});
const emits = defineEmits(["drop"]);
const props = defineProps<{
  list: IEditorElement[];
  isNested: boolean;
}>();
const hoverManage = inject("hoverManage") as HoverManage;
const focusManage = inject("focusManage") as FocusManage;
const { handleDropStart, handleDropEnd } = useDrag();
const _needMarginBottom = (elementSchema: IEditorElement) => {
  return ["card", "row", "divider"].includes(elementSchema.key);
};
</script>

<template>
  <draggable
    group="draggable"
    :list="props.list"
    item-key="id"
    :class="
      props.isNested
        ? 'min-h-[60px] border-dashed border border-[#d9d9d9]'
        : 'draggable bg-white'
    "
    ghost-class="ghost"
    @start="(e) => handleDropStart(hoverManage, focusManage)"
    @end="(e) => handleDropEnd(hoverManage, focusManage)"
    animation="300"
    @dragover.prevent
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
.draggable {
  height: calc(100vh - 6rem);
  overflow-y: scroll;
}
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
