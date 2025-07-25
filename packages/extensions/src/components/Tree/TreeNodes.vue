<template>
  <draggable
    v-model="localElementList"
    item-key="id"
    class="c-h-fit c-w-full"
    v-bind="{
      animation: 200,
      group: 'tree-drag',
      ghostClass: 'moveing',
      disabled: !_props?.draggable,
    }"
  >
    <template #item="{ element }">
      <TreeNode :key="element.id" :elementSchema="element" />
    </template>
  </draggable>
</template>
<script lang="ts" setup>
import { computed, inject } from "vue";
import TreeNode from "./TreeNode";
import draggable from "vuedraggable";
import { IElementSchema } from "@cgx-designer/types";

defineOptions({
  name: "TreeNodes",
});
const props = defineProps({
  elementList: {
    type: Array<IElementSchema>,
  },
});

const emit = defineEmits(["update:elementList"]);
const _props = inject("treeRootProp") as any;
const localElementList = computed({
  get() {
    return props.elementList;
  },
  set(e) {
    emit("update:elementList", e);
  },
});
</script>
