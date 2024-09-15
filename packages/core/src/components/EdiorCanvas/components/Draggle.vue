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
    @start="(e) => handleDropStart(e, hoverManage)"
    @end="(e) => handleDropEnd(e, hoverManage, focusManage)"
    animation="300"
    @dragover.prevent
  >
    <template #item="{ element }">
      <div
        class="editor-element-item"
        :class="
          element.key === 'row' ? 'border border-[#d9d9d9] border-dashed' : ''
        "
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
/* .ghost {
  opacity: 0.5;
  border: 1px dashed #336699;
  border: 1px solid #3b82f6;
} */
.editor-element-item {
  margin-bottom: 16px;
  width: 100%;
  /* min-height: 60px; */
  /* border: 1px dashed #336699; */
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
