基于vue的表单生成器
提供渲染器和构建器，用于生成和渲染cgx组件

## online地址(demo)
http://60.204.185.250/

## 安装(intall)

```bash
npm install @cgx-designer

pnpm

yarn
```

## 使用(How To Use)
## 项目main.ts引入
```javascript
main.js中导入样式
import "cgx-designer/dist/module.css";
import "cgx-designer/dist/style.css";
```

## 自定义的组件(How To cutom Component)
```javascript
import { elementController } from "@cgx-designer/controller";

//注册自定义组件
elementController.register({
  key: "manContainer",
  icon: "kobe",
  label: "曼巴容器",
  render: () => import("./components/KobeContainer.vue"),
  template: (uuid: Function) => {
    return {
      id: uuid(),
      key: "manContainer",
      props: {},
      elementList: [

      ],
    };
  },
  config: {
    attribute: [],
  },
});
elementController.register({
  key: "man",
  icon: "kobe",
  label: "曼巴",
  render: Kobe,
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
```

## 使用编辑器(Designer)
```vue
<script setup lang="ts">
import { onMounted } from "vue";
import { ElNotification } from "element-plus";
import { ElementBuilder } from "cgx-designer";

onMounted(() => {
  ElNotification({
    title: "🎉欢迎使用🚀",
    showClose: true,
    message:
      "🐖🐖当前打开的是example模式，代码开发并不会影响到此打包状态下的页面，如需开发请进行重新打包或切换play模式，请把自己当成一个使用者👋，体验一下吧！",
    type: "success",
    duration: 15 * 1000,
  });
});
</script>

<template>
  <div class="root">
    <ElementDesigner />
  </div>
</template>

<style scoped>
.root {
  background-color: gray;
  height: 100vh;
  width: 100vw;
}
</style>
```

## 使用渲染器(Builder)
```vue
<template>
  <div>
    <ElementBuilder ref="elementBuilderRef" :builderSchema="builderSchema"></ElementBuilder>
  </div>
</template>

<script setup lang="ts">
  import {
    BuilderSchema,
    ElementBuilder,
    ElementBuilderExpose,
  } from "cgx-designer";
  import {
    ref
  } from "vue";
  const elementBuilderRef = ref < ElementBuilderExpose | null > (null);
  const builderSchema: BuilderSchema = {
  "formSetting": {
    "modelName": "formData",
    "refName": "formRef",
    "rulesName": "formRules",
    "labelPosition": "left",
    "labelWidth": 100,
    "size": "default",
    "disabled": false
  },
  "elementList": [{
    "id": "hEzufE83",
    "field": "input-hEzufE83",
    "key": "input",
    "formItem": true,
    "props": {
      "label": "input",
      "placeholder": "placeholder",
      "size": "",
      "labelPosition": ""
    },
    "style": {}
  }],
  "script": "\n    const { inject , get , ElMessage , ElMessageBox } = this;\n\n    function fn () {\n        console.log(\"i am yours\");\n        ElMessage.success(\"i am yours\");\n    }\n    \n    const test = () => {\n        console.log(this);\n        alert(\"test\")\n    }\n\n    inject({\n      fn,\n      test,\n    })\n    "
  });
</script>

<style scoped>
</style>
```

Welcome 👋
https://gitee.com/lu-chencheng/cc-designer

