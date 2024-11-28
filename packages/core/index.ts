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

elementController.registerCustomElement("selectOption", SelectOption);
elementController.registerCustomElement("colList", ColList);
elementController.registerCustomElement("ruleSetting", RuleSetting);
elementController.registerCustomElement("tabList", TabList);
elementController.registerCustomElement("styleInput", StyleInput);
elementController.registerCustomElement("idInput", IdInput);

export * from "./src/types/index";
export * from "./src/components/ElementBuilder/type";
export { ElementDesigner, ElementBuilder };
