import { defineComponent, inject, computed } from "vue";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IElementSchema, TreeNode } from "@cgx-designer/types";
import { deepClone } from "@cgx-designer/utils";
import { CTree } from "@cgx-designer/extensions";
import { Empty } from "@cgx-designer/extensions";
import { ClearIcon, CopyIcon } from "@cgx-designer/icons";

const ElementTree = defineComponent({
  setup() {
    const elementManager = inject("elementManager") as ElementManage;
    const focusManager = inject("focusManager") as FocusManage;
    const selectedKey = computed({
      get() {
        return focusManager.focusedElement.value?.id || "";
      },
      set(e) {
        const elementSchema = elementManager.getElementById(e);
        if (elementSchema) {
          focusManager.handleFocus(elementSchema);
        }
      },
    });

    const handleNodeClick = (data: TreeNode) => {
      const element = elementManager.getElementById(data.id);
      if (
        focusManager.focusedElement.value ||
        element?.id !== focusManager.focusedElement.value!.id
      ) {
        focusManager.handleFocus(element!);
      }
    };

    const handleDeleteNode = (e: MouseEvent, data: IElementSchema) => {
      e.stopPropagation();
      elementManager.deleteElementById(data.id!);
      focusManager.resetFocus();
    };

    const handleCopyNode = (e: MouseEvent, data: IElementSchema) => {
      e.stopPropagation();
      const newElementSchema = elementManager.deepCopyElement(deepClone(data));
      elementManager.addElementFromLast(newElementSchema as IElementSchema);
      focusManager.handleFocus(newElementSchema as IElementSchema);
    };

    const buttonRender = [
      {
        title: "复制",
        Icon: CopyIcon,
        onClick: handleCopyNode,
      },
      {
        title: "删除",
        Icon: ClearIcon,
        onClick: handleDeleteNode,
      },
    ];

    return () => (
      <>
        {elementManager.elementList.value.length ? (
          <CTree
            v-model:elementList={elementManager.elementList.value}
            v-model:selectedKey={selectedKey.value}
            onNodeClick={handleNodeClick}
            draggable
          >
            {{
              extension: ({
                elementSchema,
              }: {
                elementSchema: IElementSchema;
              }) => (
                <div class="c-h-8 c-flex c-items-center c-gap-x-1 c-pr-1">
                  {buttonRender.map((item) => (
                    <div
                      title={item.title}
                      class="c-h-full c-flex c-items-center c-justify-center"
                      onClick={(e: MouseEvent) =>
                        item.onClick(e, elementSchema)
                      }
                    >
                      <item.Icon class="c-w-[14px] c-h-[14px] hover:c-fill-blue-500 dark:c-fill-white dark:hover:c-fill-blue-500" />
                    </div>
                  ))}
                </div>
              ),
            }}
          </CTree>
        ) : (
          <Empty />
        )}
      </>
    );
  },
});

export default ElementTree;
