import { elementController } from "@cgx-designer/controller";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { ElementIcon, RightIcon } from "@cgx-designer/icons";
import { computed, defineComponent, inject } from "vue";

const ElementBread = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const elementTreePath = computed(() => {
      const focusElement = focusManage.focusedElement.value;
      let tempElementTreePath = elementManage.getElementTreePathById(
        focusElement?.id!
      );
      //加上根节点
      return [{ key: "主页" }, ...tempElementTreePath];
    });
    const getElementSvg = (tag: string) => {
      if (tag === "主页") return ElementIcon;
      return elementController!.elementConfigMap[tag].icon;
    };
    //大于三只取后三个
    const renderElement = computed(() => {
      if (elementTreePath.value.length > 4) {
        return elementTreePath.value.slice(-4);
      }
      return elementTreePath.value;
    });
    return () => (
      <div class="c-h-[30px] c-w-full c-border-t c-flex c-items-center c-px-4 dark:c-border-darkMode">
        {renderElement.value.map((element, index) => {
          const Icon = getElementSvg(element.key);
          return (
            <div class="c-text-base c-mr-1 c-flex c-justify-center c-items-center c-gap-x-1">
              <div
                onClick={() => {
                  if (
                    element.key === "主页" ||
                    index === renderElement.value.length - 1
                  )
                    return;
                  focusManage.handleFocusById(element.id!);
                }}
                class="c-flex c-justify-center c-items-center c-gap-x-1 c-cursor-pointer"
              >
                {index === 0 && <Icon class="c-w-3 c-h-3" />}
                {element.key}
              </div>
              {index !== renderElement.value.length - 1 && (
                <RightIcon class="c-w-4 c-h-4" />
              )}
            </div>
          );
        })}
      </div>
    );
  },
});

export default ElementBread;
