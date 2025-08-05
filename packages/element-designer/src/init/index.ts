import { registerVueLanguage } from "@cgx-designer/extensions";
import * as monaco from "monaco-editor";

export const initMonacoVue = async () => {
  // 注册 Vue 语言支持
  registerVueLanguage();

  // 注册其他语言（Monaco 内置支持）
  monaco.languages.register({ id: "typescript" });
  monaco.languages.register({ id: "javascript" });
  monaco.languages.register({ id: "json" });
  monaco.languages.register({ id: "css" });
  monaco.languages.register({ id: "html" });
};
