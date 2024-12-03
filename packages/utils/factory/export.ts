import { BuilderSchema } from "@cgx-designer/core";
import { formatCode } from "./helper";

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
    return formatCode(
      `
    <script setup lang="ts">
    import {
      BuilderSchema,
      ElementBuilder,
      ElementBuilderExpose,
    } from "cgx-designer";
    import { ref } from "vue";

    const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
    const builderSchema: BuilderSchema = ${JSON.stringify(builderSchema)});
    </script>
    `,
      "vue"
    );
  };

  const createCGXSourceCode = async () => {
    const html = createHTML();
    const style = createStyleSheet();
    const script = await createScript();

    const code = `
      ${html}
      ${script}
      ${style}
    `;

    return formatCode(code, "vue");
  };

  return {
    createHTML,
    createStyleSheet,
    createScript,
    createCGXSourceCode
  };
};
