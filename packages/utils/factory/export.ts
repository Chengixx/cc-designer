import { BuilderSchema } from "@cgx-designer/types";
import { defaultCSS, defaultHtml } from "./data";

export type ICreateCode = ReturnType<typeof createSourceCode>;

export const createSourceCode = (builderSchema: BuilderSchema) => {
  const createHTML = () => {
    return defaultHtml;
  };

  const createStyleSheet = () => {
    return defaultCSS;
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
