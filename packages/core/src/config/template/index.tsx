import { IElementBaseSetting } from "../elementCreator";

//此类型标注是为了在createor中使用
const modules = import.meta.glob("./**/index.tsx", { eager: true });
let tempate: Record<string, IElementBaseSetting> = {};

for (const path in modules) {
  const cname = path.replace(/^\.\//, "").replace(/\/index\.tsx$/, "");
  //这里不用断言直接报错
  const module = modules[path] as { default: IElementBaseSetting };
  tempate[cname] = module.default;
}
console.log("初始化模板,自动导入的模板如下:", tempate);

export default tempate;
