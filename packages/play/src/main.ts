import { createApp } from "vue";
import "./style/index";
import App from "./App";
import "element-plus/dist/index.css";
import store from "./store";
import { loadDirectives } from "@/directives";
//引入svg
import "virtual:svg-icons-register";
import { CCTry } from "../../utils";
import { version } from "cgx-designer";

CCTry();
console.log("版本号", version);
const app = createApp(App);
/** 加载自定义指令 */
loadDirectives(app);
app.use(store);
app.mount("#app");
