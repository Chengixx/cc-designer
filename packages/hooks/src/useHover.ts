import { ref, watch, computed } from "vue";
import { ElementManage } from "./useElement";
import { useParentDomList } from "@cgx-designer/element-designer";
import { IEditorElement } from "@cgx-designer/types";
import { ModeManage } from "./useMode";

export type HoverManage = ReturnType<typeof useHover>;

export const useHover = (
  elementManage: ElementManage,
  modeManage: ModeManage
) => {
  //当前手机还是电脑还是平板模式
  const currentMode = computed(() => modeManage.mode.value);
  //总的容器
  const containerRef = ref<HTMLDivElement | null>(null);
  //初始化要展示的hover总容器
  const hoverWidgetRef = ref<HTMLDivElement | null>(null);
  //是否可以进行hover，因为拖拽的时候不要显示
  const disableHover = ref<boolean>(false);
  //当前选中的hover
  const hoveredElement = ref<IEditorElement | null>(null);
  //是否显示hoverBox
  const showHoverBox = ref<boolean>(false);
  //当前hover到的元素实例
  const hoveredElementDom = computed(() => {
    const id = hoveredElement.value?.id;
    const elementInstance = elementManage.getElementInstanceById(id!);
    if (!id || !elementInstance) return null;
    //如果是表单组件,就给表单的item
    if (
      hoveredElement.value?.formItem &&
      !!!hoveredElement.value.noShowFormItem
    ) {
      return elementManage.elementInstanceList.value[
        hoveredElement.value?.id + "-form-item"
      ].$el;
    }
    if (elementInstance.$el.nodeName === "#text") {
      return null;
    }
    //默认给一个$el实例
    if (useParentDomList.includes(hoveredElement.value?.key!)) {
      return elementInstance.$el.parentElement;
    } else {
      return elementInstance.$el;
    }
  });
  const initCanvas = (ref: HTMLDivElement) => {
    containerRef.value = ref;
  };
  const setDisableHoverStatus = (status: boolean = true) => {
    disableHover.value = status;
  };
  //初始化这个hover的物件ref
  const setHoverWidgetRef = (el: HTMLDivElement) => {
    hoverWidgetRef.value = el;
  };
  const setHoveredElement = (elementSchema: IEditorElement | null = null) => {
    hoveredElement.value = elementSchema;
  };
  const setShowHoverBox = (status: boolean = false) => {
    showHoverBox.value = status;
  };
  const handleHover = (e: MouseEvent, hoverInstanceSchema: IEditorElement) => {
    if (disableHover.value) return;
    //元素会有重叠 所以这里需要防止冒泡
    e.stopPropagation();
    hoveredElement.value = hoverInstanceSchema;
    setHoverWidgetStyle();
  };
  //修改这个hover物件的样式
  const setHoverWidgetStyle = () => {
    if (!hoveredElementDom.value) return;
    const { top: containerTop, left: containerLeft } =
      containerRef.value!.getBoundingClientRect();
    const { top, left, width, height } =
      hoveredElementDom.value.getBoundingClientRect();
    const modeStyle =
      currentMode.value !== "pc" ? { left: 10, top: 10 } : { left: 0, top: 0 };
    hoverWidgetRef.value!.style.left =
      left - containerLeft - modeStyle.left + "px";
    hoverWidgetRef.value!.style.top =
      top -
      containerTop +
      containerRef.value?.scrollTop! -
      modeStyle.top +
      "px";
    hoverWidgetRef.value!.style.width = width + "px";
    hoverWidgetRef.value!.style.height = height + "px";
  };
  const handleCancelHover = (e: MouseEvent) => {
    e.stopPropagation();
    hoveredElement.value = null;
  };

  let hideTimer: NodeJS.Timeout | number = 0;
  watch(hoveredElement, (nv) => {
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
    setHoveredElement,
    setHoverWidgetRef,
    setDisableHoverStatus,
    setShowHoverBox,
    hoveredElement,
    hoverWidgetRef,
    showHoverBox,
    handleHover,
    handleCancelHover,
    initCanvas,
  };
};
