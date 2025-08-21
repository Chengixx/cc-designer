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

// 组件注册配置
const componentMap = {
  selectOption: SelectOption,
  colList: ColList,
  ruleSetting: RuleSetting,
  customRuleSetting: CustomRuleSetting,
  tabList: TabList,
  styleInput: StyleInput,
  idInput: IdInput,
  computedStyle: ComputedStyle,
  styleIDE: StyleIDE,
} as const;

export const registerPrivateCompoents = () => {
  Object.entries(componentMap).forEach(([name, component]) => {
    elementController.registerElementRenderMap(name, component);
  });
};
