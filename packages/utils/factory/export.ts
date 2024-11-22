import { BuilderSchema } from "@cgx-designer/core";

export const html = `
<template>
  <div>
    <ElementBuilder ref="elementBuilderRef" :builderSchema="builderSchema" />
  </div>
</template>
`;

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
    const builderSchema: BuilderSchema = ${(builderSchema)});
    </script>
    `;
  };

  return {
    createHTML,
    createStyleSheet,
    createScript,
  };
};
