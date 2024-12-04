import { BuilderSchema } from "@cgx-designer/core";

export const html = `<template>
  <div>
    <ElementBuilder ref="elementBuilderRef" :builderSchema="builderSchema"></ElementBuilder>
  </div>
</template>`;

export const style = `
<style scoped>
</style>
`;

export const createSourceCode = (builderSchema: BuilderSchema) => {
  const createHTML = () => {
    return html;
  };

  const createStyleSheet = () => {
    return style;
  };

  const createScript = () => {
    return `
<script setup lang="ts">
import {
  BuilderSchema,
  ElementBuilder,
  ElementBuilderExpose,
} from "cgx-designer";
import { ref } from "vue";

const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
const builderSchema: BuilderSchema = ${JSON.stringify(builderSchema)};
</script>`;
  };

  const createCGXSourceCode = () => {
    const html = createHTML();
    const style = createStyleSheet();
    const script = createScript();

    const code = `${html}
      ${script}
      ${style}`;

    return code;
  };

  return {
    createHTML,
    createStyleSheet,
    createScript,
    createCGXSourceCode,
  };
};
