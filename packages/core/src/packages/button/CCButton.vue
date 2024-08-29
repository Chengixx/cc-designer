<template>
  <div :class="buttonClass" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};

const buttonClass = computed(() => {
  let btnClass = {
    button: true,
    "button-primary": props.type === "primary",
    "button-danger": props.type === "danger",
    "button-success": props.type === "success",
  };
  return btnClass;
});
</script>

<style scoped>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 15px;
  box-shadow: 0 6px #999;
}

.button-success {
  background-color: #4caf50;
}

.button-success:hover,
.button-success:active {
  background-color: #3e8e41;
}

.button-danger {
  background-color: #f44336;
}

.button-danger:hover,
.button-danger:active {
  background-color: #d32f2f;
}

.button-primary {
  background-color: #409eff;
}

.button-primary:hover,
.button-primary:active {
  background-color: #62adf8;
}

.button:active {
  box-shadow: 0 4px #666;
  transform: translateY(3px);
}
</style>
