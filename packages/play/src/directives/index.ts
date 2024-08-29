import { type App } from "vue";
import { vWaves } from "./waves/index";

/** 挂载自定义指令 */
export function loadDirectives(app: App) {
  app.directive("wave", vWaves);
}
