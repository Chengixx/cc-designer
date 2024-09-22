import { DefineComponent } from "vue";
//此类型标注是为了在createor中使用
const modules = import.meta.glob("./**/**.tsx", { eager: true });
let componentList: Record<string, DefineComponent> = {};

for (const path in modules) {
  //之里是获取到这个组件的名称
  const cname = path.match(/\/([^\/]+)\.tsx$/)![1];
  const module = modules[path] as Record<string, DefineComponent>;
  componentList[cname] = module.default;
}
console.log("vite自动获取的各种setting组件:", componentList);

export default componentList;
