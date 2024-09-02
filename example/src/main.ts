import { createApp } from "vue";
import App from "./App";
import "./style/index";
import "element-plus/dist/index.css";
//引入svg
import "virtual:svg-icons-register";

const app = createApp(App);
app.mount("#app");
