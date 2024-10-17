import { ref, watch, Ref } from "vue";
import { ElementManage } from "./useElement";
import { IEditorElement } from "cgx-designer";

export interface HoverManage {
  setDisableHoverStatus: (status?: boolean) => void;
  hoverWidgetRef: Ref<HTMLDivElement | null>;
  sethoverWidgetRef: (el: HTMLDivElement) => void;
  hoverElementId: Ref<string>;
  setHoverElementId: (id?: string) => void;
  showHoverBox: Ref<boolean>;
  setShowHoverBox: (status?: boolean) => void;
  handleHover: (
    e: MouseEvent,
    hoverInstanceSchema: Record<string, any>,
    elementManage: ElementManage
  ) => void;
  handleCancelHover: (e: MouseEvent) => void;
}

export const useHover = (): HoverManage => {
  //初始化要展示的hover总容器
  const hoverWidgetRef = ref<HTMLDivElement | null>(null);
  //是否可以进行hover，因为拖拽的时候不要显示
  const disableHover = ref<boolean>(false);
  //当前选中的hover
  const hoverElementId = ref<string>("");
  //是否显示hoverBox
  const showHoverBox = ref<boolean>(false);
  const setDisableHoverStatus = (status: boolean = true) => {
    disableHover.value = status;
  };
  //初始化这个hover的物件ref
  const sethoverWidgetRef = (el: HTMLDivElement) => {
    hoverWidgetRef.value = el;
  };
  const setHoverElementId = (id: string = "") => {
    hoverElementId.value = id;
  };
  const setShowHoverBox = (status: boolean = false) => {
    showHoverBox.value = status;
  };
  const handleHover = (
    e: MouseEvent,
    hoverInstanceSchema: IEditorElement,
    elementManage: ElementManage
  ) => {
    if (disableHover.value) return;
    //元素会有重叠 所以这里需要防止冒泡
    e.stopPropagation();
    hoverElementId.value = hoverInstanceSchema.id;
    //拿到实例的dom
    const hoverInstanceDom =
      elementManage.elementInstanceList.value[hoverInstanceSchema.id];
    const rect = hoverInstanceDom.getBoundingClientRect();
    //!还有一个滚动条的长度
    hoverWidgetRef.value!.style.left = rect.left - 280 + 12 + "px";
    hoverWidgetRef.value!.style.top = rect.top - 80 - 8 + "px";
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
};
