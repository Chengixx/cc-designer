<script setup lang="ts">
import { Collapse, CollapseItem } from "@cgx-designer/extensions";
</script>
<template>
  <div class="c-h-screen c-w-screen">
    <Collapse>
      <CollapseItem name="1" title="标题1">
        <div class=" c-w-full c-h-20">我是一些东西</div>
      </CollapseItem>
      <CollapseItem name="2" title="标题2">
        <div class="c-w-full c-h-20">我是一些东西</div>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<style scoped></style>
