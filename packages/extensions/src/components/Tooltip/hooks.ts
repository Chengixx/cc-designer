import { computed, reactive, useSlots, VNode } from "vue";

export function useSlotsExist(slotsName: string | string[] = "default") {
  const slots = useSlots(); // 获取当前组件的所有插槽
  // 检查特定名称的插槽是否存在且不为空
  const checkSlotsExist = (slotName: string): boolean => {
    const slotsContent = slots[slotName]?.();
    const checkExist = (slotContent: VNode) => {
      if (slotContent.type === Comment) {
        return false;
      }
      if (Array.isArray(slotContent.children) && !slotContent.children.length) {
        return false;
      }
      if (slotContent.type !== Text) {
        return true;
      }
      if (typeof slotContent.children === "string") {
        return slotContent.children.trim() !== "";
      }
    };
    if (slotsContent && slotsContent?.length) {
      const result = slotsContent.some((slotContent: VNode) => {
        return checkExist(slotContent);
      });
      return result;
    }
    return false;
  };
  if (Array.isArray(slotsName)) {
    const slotsExist = reactive<any>({});
    slotsName.forEach((slotName: string) => {
      const exist = computed(() => checkSlotsExist(slotName));
      slotsExist[slotName] = exist; // 将一个 ref 赋值给一个 reactive 属性时，该 ref 会自动解包
    });
    return slotsExist;
  } else {
    return computed(() => checkSlotsExist(slotsName));
  }
}

export function rafTimeout(
  fn: Function,
  delay: number = 0,
  interval: boolean = false
): object {
  let start: number | null = null; // 记录动画开始的时间戳
  function timeElapse(timestamp: number) {
    // 定义动画帧回调函数
    /**/
    if (!start) {
      // 如果还没有开始时间，则以当前时间为开始时间
      start = timestamp;
    }
    const elapsed = timestamp - start;
    if (elapsed >= delay) {
      try {
        fn(); // 执行目标函数
      } catch (error) {
        console.error("Error executing rafTimeout function:", error);
      }
      if (interval) {
        // 如果需要间隔执行，则重置开始时间并继续安排下一次动画帧
        start = timestamp;
        raf.id = requestAnimationFrame(timeElapse);
      }
    } else {
      raf.id = requestAnimationFrame(timeElapse);
    }
  }
  interface AnimationFrameID {
    id: number;
  }
  // 创建一个对象用于存储动画帧的 ID，并初始化动画帧
  const raf: AnimationFrameID = {
    id: requestAnimationFrame(timeElapse),
  };
  return raf;
}

export function cancelRaf(raf: { id: number }): void {
  if (raf && raf.id && typeof raf.id === "number") {
    cancelAnimationFrame(raf.id);
  } else {
    console.warn("cancelRaf received an invalid id:", raf);
  }
}
