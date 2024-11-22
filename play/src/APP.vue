<script setup lang="ts">
import {
  BuilderSchema,
  ElementBuilder,
  ElementBuilderExpose,
} from "cgx-designer";
import { ref } from "vue";

const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
const builderSchema: BuilderSchema | undefined = undefined;
</script>
<template>
  <div>
    <ElementBuilder ref="elementBuilderRef" :builderSchema="builderSchema" />
  </div>
</template>

<style scoped></style>
