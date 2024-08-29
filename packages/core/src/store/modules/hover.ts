import { defineStore } from "pinia";
import store from "../index";
import { ref, watch } from "vue";
import { useElementStoreHook } from "./element";

export const usehoverStore = defineStore("hover", () => {
  //是否可以进行hover，因为拖拽的时候不要显示
  const disableHover = ref<boolean>(false);
  const setDisableHoverStatus = (status: boolean = true) => {
    disableHover.value = status;
  };
  //初始化要展示的hover总容器
  const hoverWidgetRef = ref<HTMLDivElement | null>(null);
  //初始化这个hover的物件ref
  const sethoverWidgetRef = (el: HTMLDivElement) => {
    hoverWidgetRef.value = el;
  };
  //当前选中的hover
  const hoverElementId = ref<string>("");
  const setHoverElementId = (id: string = "") => {
    hoverElementId.value = id;
  };
  const showHoverBox = ref<boolean>(false);
  const setShowHoverBox = (status: boolean = false) => {
    showHoverBox.value = status;
  };
  const handleHover = (e: MouseEvent, hoverId: string) => {
    if (disableHover.value) return;
    e.stopPropagation();
    hoverElementId.value = hoverId;
    const hoverDom = useElementStoreHook().elementInstanceList[hoverId];
    // console.log(hoverDom, "最外层的元素是哪个");
    const rect = hoverDom.getBoundingClientRect();
    //!还有一个滚动条的长度
    hoverWidgetRef.value!.style.left = rect.left - 280 + 4 + "px";
    hoverWidgetRef.value!.style.top = rect.top - 80 + "px";
    hoverWidgetRef.value!.style.width = rect.width + "px";
    hoverWidgetRef.value!.style.height = rect.height + "px";
  };
  const handleCancelHover = (e: MouseEvent) => {
    e.stopPropagation();
    hoverElementId.value = "";
  };

  let hideTimer: NodeJS.Timeout | number = 0;
  watch(hoverElementId, (nv) => {
    if (nv) {
      showHoverBox.value = true;
      clearTimeout(hideTimer);
    } else {
      //给一个缓冲的时间
      hideTimer = setTimeout(() => {
        showHoverBox.value = false;
      }, 300);
    }
  });
  return {
    setHoverElementId,
    sethoverWidgetRef,
    setDisableHoverStatus,
    setShowHoverBox,
    hoverElementId,
    hoverWidgetRef,
    showHoverBox,
    handleHover,
    handleCancelHover,
  };
});

/** 在 setup 外使用 */
export function usehoverStoreHook() {
  return usehoverStore(store);
}
