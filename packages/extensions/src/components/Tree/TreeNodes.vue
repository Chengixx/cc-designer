<template>
  <draggable
    v-model="localElementList"
    item-key="id"
    class="c-h-fit c-w-full"
    v-bind="{
      animation: 200,
      group: 'tree-drag',
      ghostClass: 'moveing',
    }"
  >
    <template #item="{ element, index }">
      <TreeNode :key="element.id" :elementSchema="element" />
    </template>
  </draggable>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import TreeNode from "./TreeNode";
import draggable from "vuedraggable";
import { IEditorElement } from "@cgx-designer/core";

defineOptions({
  name: "TreeNodes",
});
const props = defineProps({
  elementList: {
    type: Array<IEditorElement>,
  },
});

const emit = defineEmits(["update:elementList"]);
const localElementList = computed({
  get() {
    return props.elementList;
  },
  set(e) {
    emit("update:elementList", e);
  },
});
</script>
