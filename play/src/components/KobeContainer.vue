<script setup lang="ts">
import { IElementSchema } from "cgx-designer";
import { PropType } from "vue";

defineProps({
  elementSchema: {
    type: Object as PropType<IElementSchema>,
  },
});
</script>

<template>
  <div class="border border-red-600">
    <div class="h-10 bg-blue-500 text-white text-center">
      这是头部
    </div>
    <slot name="editNode" />
  </div>
</template>

<style scoped></style>
