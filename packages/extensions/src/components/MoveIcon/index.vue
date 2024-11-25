<template>
  <div
    class="contact-container"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    @click="handleClick"
    ref="contactContainer"
  >
    <div class="contact-item" ref="contactItem">
      <slot />
    </div>
    <span class="tooltip" ref="tooltip">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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

const contactItem = ref<HTMLElement | null>(null);
const tooltip = ref<HTMLElement | null>(null);
const contactContainer = ref<HTMLElement | null>(null);

const handleMouseOver = () => {
  if (tooltip.value && contactItem.value) {
    const tooltipWidth = tooltip.value.offsetWidth;
    console.log(tooltipWidth);
    contactItem.value.style.transform = `translateX(-${tooltipWidth + 6}px)`;
    contactContainer.value!.style.width = `${tooltipWidth + 6}px`;
    if (tooltip.value) {
      tooltip.value.style.visibility = "visible";
      tooltip.value.style.opacity = "1";
    }
  }
};

const handleMouseOut = () => {
  if (contactItem.value) {
    contactItem.value.style.transform = "translateX(0)";
  }
  if (tooltip.value) {
    tooltip.value.style.visibility = "hidden";
    tooltip.value.style.opacity = "0";
  }
  contactContainer.value!.style.width = "";
};
</script>

<style scoped>
.contact-container {
  position: relative;
  cursor: pointer;
  display: flex;
}

.contact-item {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.tooltip {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0s 0.3s;
  white-space: nowrap;
}

.contact-container:hover .contact-item {
  /* transform: translateX(-120%); */
}

.contact-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
  transition:
    opacity 0.3s ease,
    visibility 0s;
}
</style>
