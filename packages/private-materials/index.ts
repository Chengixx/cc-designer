import { elementController } from "@cgx-designer/controller";
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
} from "./components";

export * from "./components";
export const registerPrivateCompoents = () => {
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
};
