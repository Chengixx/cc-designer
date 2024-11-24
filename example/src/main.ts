import { createApp } from "vue";
import App from "./App.vue";
import "./style/index";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import "virtual:svg-icons-register";
import { elementController } from "cgx-designer";
import "cgx-designer/dist/module.css";
import "cgx-designer/dist/style.css";

//注册自定义组件
elementController.register({
  key: "man",
  icon: "kobe",
  label: "曼巴",
  render: () => import("./components/Kobe.vue"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "man",
      props: {
        value:
          "科比·布莱恩特是美国职业篮球运动员，出生于1978年8月23日。他在1996年被洛杉矶湖人队选中，整个职业生涯均效力于该队，赢得了五个NBA总冠军。科比以其出色的得分能力和竞争精神著称，被誉为篮球史上最伟大的球员之一。他在2016年退役，之后于2020年不幸因事故去世。科比的影响力超越了篮球，激励了无数人追求自己的梦想。",
      },
    };
  },
  config: {
    attribute: [
      {
        label: "value",
        key: "input",
        field: "props.value",
      },
    ],
  },
});

const app = createApp(App);
app.mount("#app");
