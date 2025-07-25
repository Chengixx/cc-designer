import { defineComponent, inject, computed } from "vue";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IElementSchema, TreeNode } from "@cgx-designer/types";
import { deepClone } from "@cgx-designer/utils";
import { CTree } from "@cgx-designer/extensions";
import { Empty } from "@cgx-designer/extensions";
import { ClearIcon, CopyIcon } from "@cgx-designer/icons";

const ElementTree = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const selectedKey = computed({
      get() {
        return focusManage.focusedElement.value?.id || "";
      },
      set(e) {
        const elementSchema = elementManage.getElementById(e);
        if (elementSchema) {
          focusManage.handleFocus(elementSchema);
        }
      },
    });

    const handleNodeClick = (data: TreeNode) => {
      const element = elementManage.getElementById(data.id);
      if (
        focusManage.focusedElement.value ||
        element?.id !== focusManage.focusedElement.value!.id
      ) {
        focusManage.handleFocus(element!);
      }
    };

    const handleDeleteNode = (e: MouseEvent, data: IElementSchema) => {
      e.stopPropagation();
      elementManage.deleteElementById(data.id!);
      focusManage.resetFocus();
    };

    const handleCopyNode = (e: MouseEvent, data: IElementSchema) => {
      e.stopPropagation();
      const newElementSchema = elementManage.deepCopyElement(deepClone(data));
      elementManage.addElementFromLast(newElementSchema as IElementSchema);
      focusManage.handleFocus(newElementSchema as IElementSchema);
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

    return () => {
      return (
        <>
          {elementManage.elementList.value.length ? (
            <CTree
              v-model:elementList={elementManage.elementList.value}
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
    };
  },
});

export default ElementTree;
