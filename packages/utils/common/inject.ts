import { InjectionKey, inject } from "vue";
import {
  FocusManage,
  ElementManage,
  ThemeManage,
  QueueManage,
  CollapseManage,
  HoverManage,
  FormManage,
  ModeManage,
  SourceDataManage,
  FunctionManage,
} from "@cgx-designer/hooks";

const focusManagerKey = Symbol("focusManager") as InjectionKey<FocusManage>;
const elementManagerKey = Symbol(
  "elementManager"
) as InjectionKey<ElementManage>;
const themeManagerKey = Symbol("themeManager") as InjectionKey<ThemeManage>;
const collapseManagerKey = Symbol(
  "collapseManager"
) as InjectionKey<CollapseManage>;
const hoverManagerKey = Symbol("hoverManager") as InjectionKey<HoverManage>;
const formManagerKey = Symbol("formManager") as InjectionKey<FormManage>;
const modeManagerKey = Symbol("modeManager") as InjectionKey<ModeManage>;
const sourceDataManagerKey = Symbol(
  "sourceDataManager"
) as InjectionKey<SourceDataManage>;
const functionManagerKey = Symbol(
  "functionManager"
) as InjectionKey<FunctionManage>;
const queueManagerKey = Symbol("queueManager") as InjectionKey<QueueManage>;

/**
 * 强制注入，确保返回值不为undefined
 * 如果注入失败会抛出错误，帮助快速定位问题
 */
export function forceInject<T>(key: InjectionKey<T>): T {
  const value = inject(key);
  if (value === undefined) {
    throw new Error(`Failed to inject value for key: ${key.toString()}`);
  }
  return value;
}

export {
  focusManagerKey,
  elementManagerKey,
  themeManagerKey,
  collapseManagerKey,
  hoverManagerKey,
  formManagerKey,
  modeManagerKey,
  sourceDataManagerKey,
  functionManagerKey,
  queueManagerKey,
};
