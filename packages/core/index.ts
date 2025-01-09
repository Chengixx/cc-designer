import ElementDesigner from "./src/components/ElementDesigner/index";
import ElementBuilder from "./src/components/ElementBuilder/index";
import {
  SelectOption,
  ColList,
  RuleSetting,
  TabList,
  StyleInput,
  IdInput,
  ComputedStyle,
  StyleIDE
} from "./src/custom";
import { elementController } from "@cgx-designer/controller";
import "@cgx-designer/materials/core/elementPlus/index.css"
import "@cgx-designer/materials/core/vuetify/index.css"

elementController.registerElementRenderMap("selectOption", SelectOption);
elementController.registerElementRenderMap("colList", ColList);
elementController.registerElementRenderMap("ruleSetting", RuleSetting);
elementController.registerElementRenderMap("tabList", TabList);
elementController.registerElementRenderMap("styleInput", StyleInput);
elementController.registerElementRenderMap("idInput", IdInput);
elementController.registerElementRenderMap("computedStyle", ComputedStyle);
elementController.registerElementRenderMap("styleIDE", StyleIDE);

export * from "./src/types/index";
export * from "./src/components/ElementBuilder/type";
export { ElementDesigner, ElementBuilder };
