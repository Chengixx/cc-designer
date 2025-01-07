<script setup lang="ts">
import type { MessageProps } from "./types";
import { computed, onMounted, ref, watch } from "vue";
import { getLastBottomOffset } from "./methods";
import { delay, bind } from "lodash";
import { useEventListener, useOffset } from "../../hooks";
import { RenderVnode } from "@cgx-designer/utils";
import { MessageIcon } from "@cgx-designer/icons";

defineOptions({
  name: "ErMessage",
});

const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
});

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();

// div 的高度
const boxHeight = ref(0);

const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight,
});

const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}));

let timer: number;
function startTimer() {
  if (props.duration === 0) return;
  timer = delay(close, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

function close() {
  visible.value = false;
}

onMounted(() => {
  visible.value = true;
  startTimer();
});

useEventListener(document, "keydown", (e: Event) => {
  const { code } = e as KeyboardEvent;
  if (code === "Escape") {
    close();
  }
});

watch(visible, (val) => {
  if (!val) boxHeight.value = -props.offset;
});

defineExpose({
  bottomOffset,
  close,
});
</script>

<template>
  <Transition
    :name="transitionName"
    @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestory()"
  >
    <div
      ref="messageRef"
      class="cgx-message"
      :class="{
        [`cgx-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      :style="cssStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="c-mr-1">
        <MessageIcon class="c-w-4 c-h-4 c-fill-gray-400" />
      </div>
      <div class="cgx-message__content">
        <slot>
          <render-vnode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="cgx-message__close" v-if="showClose">
        <div @click.stop="close">X</div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import "./style.css";
</style>
