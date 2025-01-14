import { defineComponent, inject, computed } from "vue";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IEditorElement, TreeNode } from "../../../../../types";
import { deepClone } from "@cgx-designer/utils";
import { CTree } from "@cgx-designer/extensions";
import { elementController } from "@cgx-designer/controller";
import { VBtnColorType } from "@cgx-designer/materials";
import Empty from "../../../../Empty";
import { ClearIcon, CopyIcon } from "@cgx-designer/icons";

const ElementTree = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const commands = inject("commands") as Record<string, Function> | null;
    const selectedKey = computed({
      get() {
        return focusManage.focusedElement.value?.id || "";
      },
      set(e) {
        const elementSchema = elementManage.findElementById(e);
        if (elementSchema) {
          focusManage.handleFocus(elementSchema);
        }
      },
    });

    const handleNodeClick = (data: TreeNode) => {
      const element = elementManage.findElementById(data.id);
      if (
        focusManage.focusedElement.value ||
        element?.id !== focusManage.focusedElement.value!.id
      ) {
        focusManage.handleFocus(element!);
      }
    };

    const handleDeleteNode = (data: IEditorElement) => {
      commands!.handleDelete(data.id);
    };

    const handleCopyNode = (data: IEditorElement) => {
      const newElementSchema = elementManage.deepCopyElement(deepClone(data));
      commands!.handleLastAdd(newElementSchema);
    };

    return () => {
      return (
        <>
          {elementManage.elementList.value.length ? (
            <CTree
              v-model:elementList={elementManage.elementList.value}
              v-model:selectedKey={selectedKey.value}
              onNodeClick={handleNodeClick}
            >
              {{
                extension: ({
                  elementSchema,
                }: {
                  elementSchema: IEditorElement;
                }) => (
                  <div class="c-h-6 c-flex c-items-center c-gap-x-1 c-pr-1">
                    <div
                      title="复制"
                      class="c-h-full c-flex c-items-center c-justify-center"
                      onClick={(_: MouseEvent) => handleCopyNode(elementSchema)}
                    >
                      <CopyIcon class="c-w-[16px] c-h-[16px] hover:c-fill-blue-500 dark:c-fill-white dark:hover:c-fill-blue-500" />
                    </div>
                    <div
                      title="删除"
                      class="c-h-full c-flex c-items-center c-justify-center"
                      onClick={(_: MouseEvent) =>
                        handleDeleteNode(elementSchema)
                      }
                    >
                      <ClearIcon class="c-w-[16px] c-h-[16px] hover:c-fill-blue-500 dark:c-fill-white dark:hover:c-fill-blue-500" />
                    </div>
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
