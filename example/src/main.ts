import { createApp } from "vue";
import App from "./App";
import "./style/index";
import "element-plus/dist/index.css";
//引入svg
import "virtual:svg-icons-register";
import { elementConfig } from "@cgx-designer/utils";

//注册自定义组件
elementConfig.register({
  key: "man",
  icon: "smile",
  label: "曼巴",
  render: () => import("./components/Man"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "man",
      props: {},
    };
  },
});

const app = createApp(App);
app.mount("#app");
