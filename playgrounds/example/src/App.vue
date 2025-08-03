<script setup lang="ts">
import { h, onMounted } from "vue";
import { ElNotification } from "element-plus";
import { ElementBuilder, ElementDesigner } from "cgx-designer";

onMounted(() => {
  ElNotification({
    title: "🎉欢迎使用🚀",
    showClose: true,
    message:
      "🐖🐖当前打开的是example模式，代码开发并不会影响到此打包状态下的dist文件，如需开发请进行用play启动项目，请把自己当成一个使用者👋，体验一下吧！",
    type: "success",
    duration: 15 * 1000,
    position: "bottom-right",
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
