<template>
  <div
    class="move-icon"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    @click="handleClick"
    ref="containerRef"
  >
    <div ref="iconRef">
      <slot />
    </div>
    <span class="tooltip" ref="tooltipRef">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps({
  label: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["click"]);
const handleClick = (e: MouseEvent) => {
  emits("click", e);
};

const iconRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  containerRef.value!.style.width = `${iconRef.value?.offsetWidth}px`;
});

const handleMouseOver = () => {
  if (tooltipRef.value && iconRef.value && containerRef.value) {
    const tooltipWidth = tooltipRef.value.offsetWidth;
    const iconRefWidth = iconRef.value.offsetWidth;
    containerRef.value.style.width = `${iconRefWidth + tooltipWidth + 6}px`;

    if (tooltipRef.value) {
      tooltipRef.value.style.visibility = "visible";
      tooltipRef.value.style.opacity = "1";
    }
  }
};

const handleMouseOut = () => {
  if (iconRef.value && containerRef.value) {
    containerRef.value.style.width = `${iconRef.value?.offsetWidth}px`;
  }
  if (tooltipRef.value) {
    tooltipRef.value.style.visibility = "hidden";
    tooltipRef.value.style.opacity = "0";
  }
};
</script>

<style scoped>
.move-icon {
  position: relative;
  cursor: pointer;
  display: flex;
  transition: width 0.3s ease;
}

.tooltip {
  position: absolute;
  top: 1px;
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.1s ease,
    visibility 0s 0.1s;
  white-space: nowrap;
}
</style>
