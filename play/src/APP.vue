<script setup lang="ts">
import { TabPane, Tabs } from "@cgx-designer/extensions";
import { ref } from "vue";

const activeTab = ref("0");
const handleClick = (tab: any, e: any) => {};
</script>
<template>
  <div>
    <Tabs v-model="activeTab" @tabClick="handleClick">
      <TabPane label="第一个">1</TabPane>
      <TabPane label="第二个">2</TabPane>
      <TabPane label="第三个">3</TabPane>
    </Tabs>
  </div>
</template>

<style scoped></style>
