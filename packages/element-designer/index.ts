import ElementDesigner from "./src/core/index";
import "@cgx-designer/base-materials/core/elementPlus/index.css";
import "@cgx-designer/base-materials/core/vuetify/index.css";
import { registerPrivateCompoents } from "@cgx-designer/private-materials";
import "@cgx-designer/extensions/src/components/MonacoIDE/vue";

registerPrivateCompoents();

export * from "./src/constant";
export { ElementDesigner };
