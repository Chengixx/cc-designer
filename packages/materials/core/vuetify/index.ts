import { ElementPlugin, IElementBaseSetting } from "@cgx-designer/controller";

//此类型标注是为了在creator中使用
const modules = import.meta.glob("./**/index.tsx", { eager: true });
export let vuetifyBaseTemplate: Record<string, IElementBaseSetting> = {};

for (const path in modules) {
  const cname = path.replace(/^\.\//, "").replace(/\/index\.tsx$/, "");
  //这里不用断言直接报错
  const module = modules[path] as { default: IElementBaseSetting };
  vuetifyBaseTemplate[cname] = module.default;
}
console.log("初始化模板,vuetify自动导入的模板如下:", vuetifyBaseTemplate);

export let vuetifyPlugin: ElementPlugin = {
  name: "vuetify",
  template: vuetifyBaseTemplate,
};
