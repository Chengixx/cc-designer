import ElementDesigner from "./src/components/ElementDesigner/index";
import ElementBuilder from "./src/components/ElementBuilder/index";
import {
  SelectOption,
  ColList,
  RuleSetting,
  TabList,
  StyleInput,
  IdInput,
} from "./src/custom";
import { elementController } from "@cgx-designer/utils";

elementController.registerElementRenderMap("selectOption", SelectOption);
elementController.registerElementRenderMap("colList", ColList);
elementController.registerElementRenderMap("ruleSetting", RuleSetting);
elementController.registerElementRenderMap("tabList", TabList);
elementController.registerElementRenderMap("styleInput", StyleInput);
elementController.registerElementRenderMap("idInput", IdInput);

export * from "./src/types/index";
export * from "./src/components/ElementBuilder/type";
export { ElementDesigner, ElementBuilder };
