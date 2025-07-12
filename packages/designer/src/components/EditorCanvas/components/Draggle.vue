<script setup lang="ts">
import draggable from "vuedraggable";
import { FocusManage, ModeManage, QueueManage } from "@cgx-designer/hooks";
import EditorElement from "./EditorElement";
import { useDrag } from "@cgx-designer/hooks";
import { inject } from "vue";
import { HoverManage } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { noNeedMarginBottomDomList } from "../../../constant";
import { elementController } from "@cgx-designer/controller";
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
const modeManage = inject("modeManage") as ModeManage;
const queueManage = inject("queueManage") as QueueManage;
const { handleDropStart, handleDropEnd: useDragHandleDragEnd } = useDrag();
const _noNeedMarginBottom = (elementSchema: IEditorElement) =>
  noNeedMarginBottomDomList.includes(elementSchema.key) ||
  elementController.getCurrentElementLibraryName() === "vuetify";

const handleAdd = (index: number) => {
  setTimeout(() => {
    focusManage.handleFocus(props.elementSchemaList[index]);
    queueManage.push("add");
  }, 0);
};

const handleDragEnd = () => {
  useDragHandleDragEnd(hoverManage, focusManage);
  queueManage.push("drag");
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
    :class="[
      props.isNested
        ? 'c-min-h-[60px] c-border-dashed c-border c-border-[#d9d9d9] c-h-full'
        : modeManage.mode.value === 'pc'
          ? 'c-min-h-[calc(100vh-116px)] c-w-full c-bg-white c-p-2 dark:c-bg-darkMode'
          : 'c-min-h-[calc(100vh-136px)] c-w-full c-bg-white c-p-2 dark:c-bg-darkMode',
      ,
    ]"
    @start="() => handleDropStart(hoverManage, focusManage)"
    @end="() => handleDragEnd()"
    @add="(e: any) => handleAdd(e.newIndex)"
    @dragover.prevent
    item-key="id"
  >
    <template #item="{ element, index }">
      <div
        :key="index"
        :class="[
          _noNeedMarginBottom(element) ? 'c-mb-0' : 'c-mb-4',
          element.key === 'row' &&
            'c-border c-border-[#d9d9d9] c-border-dashed',
          element.key === 'divider' && 'c-inline-block',
          'editor-element-item c-relative',
        ]"
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
</style>
