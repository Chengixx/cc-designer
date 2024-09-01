import { createApp } from "vue";
import "./style/index";
import App from "./App";
import "element-plus/dist/index.css";
import { loadDirectives } from "@/directives";
//引入svg
import "virtual:svg-icons-register";

const app = createApp(App);
/** 加载自定义指令 */
loadDirectives(app);
app.mount("#app");
