import { computed, defineComponent, inject, nextTick, ref, watch } from "vue";
import { ElementManage, FocusManage, QueueManage } from "@cgx-designer/hooks";
import { deepClone } from "@cgx-designer/utils";
import { ClearIcon, CopyIcon, TopIcon } from "@cgx-designer/icons";
import {
  noCopyDomList,
  findHigherLevelDomList,
  useParentDomList,
} from "../../../constant/index";
import { elementController } from "@cgx-designer/controller";
import { IEditorElement } from "@cgx-designer/types";

const ButtonTool = defineComponent({
  setup() {
    const focusManage = inject("focusManage") as FocusManage;
    const elementManage = inject("elementManage") as ElementManage;
    const queueManage = inject("queueManage") as QueueManage;
    const top = ref<string | undefined>("-28px");
    const bottom = ref<string | undefined>();
    const handleCopy = (e: MouseEvent) => {
      e.stopPropagation();
      const newElementSchema = elementManage.deepCopyElement(
        deepClone(focusManage.focusedElement.value!)
      );
      elementManage.addElementFromLast(newElementSchema as IEditorElement);
      focusManage.handleFocus(newElementSchema as IEditorElement);
      queueManage.push("copy");
    };

    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      focusManage.startFocusTimedQuery();
      const id = focusManage.focusedElement.value?.id;
      elementManage.deleteElementById(id!);
      focusManage.resetFocus();
      queueManage.push("delete");
      focusManage.stopFocusTimedQuery();
    };

    const handleTop = (e: MouseEvent) => {
      e.stopPropagation();
      const id = focusManage.focusedElement.value?.id;
      const parentDom = elementManage.getParentElementById(id!);
      focusManage.handleFocus(parentDom!);
    };

    const elementTag = computed(() => {
      if (!focusManage.focusedElement.value) return "";
      return elementController.getElementConfig(
        focusManage.focusedElement.value?.key!
      ).label;
    });

    const getComponentInstance = computed(() => {
      const id = focusManage.focusedElement.value?.id || "";
      const elementSchema = elementManage.getElementById(id);
      const elementInstance = elementManage.getElementInstanceById(id);
      if (!id || !elementInstance || !elementSchema) return null;
      if (elementSchema.formItem && !!!elementSchema.noShowFormItem) {
        return elementManage.getElementInstanceById(id + "-form-item").$el;
      }
      if (elementInstance.$el.nodeName === "#text") {
        return null;
      }
      // 有这个的话要返回他的父亲给他
      if (useParentDomList.includes(elementSchema.key)) {
        return elementInstance.$el.parentElement;
      } else {
        return elementInstance.$el;
      }
    });

    watch(
      () => getComponentInstance.value,
      () => {
        if (!getComponentInstance.value) return;
        nextTick(() => {
          const elementInstance = getComponentInstance.value;
          // console.log(elementInstance, elementInstance.getBoundingClientRect());
          //如果实例几乎在最上面
          if (elementInstance.getBoundingClientRect().top < 110) {
            bottom.value = "-28px";
            top.value = undefined;
          } else {
            top.value = "-28px";
            bottom.value = undefined;
          }
        });
      }
    );

    return () => {
      const ElementIcon =
        (focusManage.focusedElement.value &&
          elementController.getElementConfig(
            focusManage.focusedElement.value?.key!
          ).icon) ||
        (() => null);

      return (
        <div
          class="c-absolute c-right-1 c-cursor-pointer c-flex"
          style={{
            top: top.value,
            bottom: bottom.value,
          }}
        >
          {/* 组件信息 */}
          <div class="c-mr-1 c-flex c-items-center c-text-xs c-bg-blue-500 c-p-1 c-text-white c-pointer-events-none c-rounded c-gap-x-1">
            <ElementIcon class="c-w-[16px] c-h-[16px] hover:c-fill-blue-500 c-fill-white dark:hover:c-fill-blue-500" />
            {elementTag.value}
          </div>
          {/* 操作按钮 */}
          <div class="c-pointer-events-auto c-bg-blue-500 c-flex c-items-center c-overflow-hidden">
            {!noCopyDomList.includes(
              focusManage.focusedElement.value?.key!
            ) && (
              <div
                onClick={(e: MouseEvent) => handleCopy(e)}
                title="复制组件"
                class="hover:c-bg-blue-600 c-transition-colors c-duration-300 c-h-full c-w-fit c-p-1 c-flex c-justify-center c-items-center"
              >
                <CopyIcon class="c-w-[13px] c-h-[13px] c-fill-white" />
              </div>
            )}
            {findHigherLevelDomList.includes(
              focusManage.focusedElement.value?.key!
            ) && (
              <div
                onClick={(e: MouseEvent) => handleTop(e)}
                title="父级元素"
                class="hover:c-bg-blue-600 c-transition-colors c-duration-300 c-h-full c-w-fit c-p-1 c-flex c-justify-center c-items-center"
              >
                <TopIcon class="c-w-[13px] c-h-[13px] c-fill-white" />
              </div>
            )}
            <div
              onClick={(e: MouseEvent) => handleDelete(e)}
              title="删除组件"
              class="hover:c-bg-blue-600 c-transition-colors c-duration-300 c-h-full c-w-fit c-p-1 c-flex c-justify-center c-items-center"
            >
              <ClearIcon class="c-w-[13px] c-h-[13px] c-fill-white" />
            </div>
          </div>
        </div>
      );
    };
  },
});
export default ButtonTool;
