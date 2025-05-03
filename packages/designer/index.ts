import ElementDesigner from "./src/components/index";
import {
  SelectOption,
  ColList,
  RuleSetting,
  TabList,
  StyleInput,
  IdInput,
  ComputedStyle,
  StyleIDE,
  CustomRuleSetting,
} from "./src/custom";
import { elementController } from "@cgx-designer/controller";
import "@cgx-designer/materials/core/elementPlus/index.css";
import "@cgx-designer/materials/core/vuetify/index.css";

elementController.registerElementRenderMap("selectOption", SelectOption);
elementController.registerElementRenderMap("colList", ColList);
elementController.registerElementRenderMap("ruleSetting", RuleSetting);
elementController.registerElementRenderMap(
  "customRuleSetting",
  CustomRuleSetting
);
elementController.registerElementRenderMap("tabList", TabList);
elementController.registerElementRenderMap("styleInput", StyleInput);
elementController.registerElementRenderMap("idInput", IdInput);
elementController.registerElementRenderMap("computedStyle", ComputedStyle);
elementController.registerElementRenderMap("styleIDE", StyleIDE);

export * from "./src/constant";
export { ElementDesigner };
