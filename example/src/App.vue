<script setup lang="ts">
import { h, onMounted } from "vue";
import { ElNotification } from "element-plus";
import { ElementBuilder, ElementDesigner } from "cgx-designer";

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
  <div class="bg-gray-100 h-screen">
    <ElementDesigner />
  </div>
</template>

<style scoped></style>
