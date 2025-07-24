import ElementDesigner from "./src/core/index";
import "@cgx-designer/base-materials/core/elementPlus/index.css";
import "@cgx-designer/base-materials/core/vuetify/index.css";
import { initMonacoVue } from "./src/init";
import { registerPrivateCompoents } from "@cgx-designer/private-materials";

registerPrivateCompoents();
initMonacoVue();

export * from "./src/constant";
export { ElementDesigner };
