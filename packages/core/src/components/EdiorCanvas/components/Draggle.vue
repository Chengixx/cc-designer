<script lang="ts">
export default {
  name: "Draggle",
};
</script>
<script setup lang="ts">
import draggable from "vuedraggable";
import { FocusManage, IEditorElement } from "@cgx-designer/hooks";
import EditorElement from "./EditorElement";
import { useDrag } from "@cgx-designer/hooks";
import { inject } from "vue";
import { HoverManage } from "@cgx-designer/hooks";
const hoverManage = inject("hoverManage") as HoverManage;
const focusManage = inject("focusManage") as FocusManage;
const props = defineProps<{
  list: IEditorElement[];
  isNested: boolean;
  elementKey?: string;
}>();
const emits = defineEmits(["drop"]);
const { handleDropStart, handleDropEnd } = useDrag();
</script>

<template>
  <draggable
    group="draggable"
    :list="props.list"
    item-key="id"
    :class="props.isNested ? 'min-h-[60px]' : 'draggable bg-white'"
    ghost-class="ghost"
    @start="(e) => handleDropStart(hoverManage, focusManage)"
    @end="(e) => handleDropEnd(hoverManage, focusManage)"
    animation="300"
    @dragover.prevent
  >
    <template #item="{ element }">
      <div
        :class="[
          element.key === 'card' || element.key === 'row' ? 'mb-0' : 'mb-4',
          element.key === 'row' ? 'border border-[#d9d9d9] border-dashed' : '',
          'editor-element-item',
        ]"
        :key="element.id"
      >
        <EditorElement :element="element" />
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
.not-draggable {
  cursor: no-drop;
}
</style>
