import { defineComponent, inject, computed } from "vue";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IEditorElement, TreeNode } from "../../../../../types";
import { deepClone } from "@cgx-designer/utils";
import { CTree } from "@cgx-designer/extensions";
import { elementController } from "@cgx-designer/controller";
import { VBtnColorType } from "@cgx-designer/materials";
import Empty from "../../../../Empty";

const ElementTree = defineComponent({
  setup() {
    const Button = elementController.getElementRender("button");
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

    const isVuetify = computed(() => {
      return elementController.getCurrentElementLibrary() === "vuetify";
    });

    const computedButtonColor = (type: keyof typeof VBtnColorType) => {
      if (isVuetify.value) {
        return VBtnColorType[type];
      } else {
        return undefined;
      }
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
                  <div>
                    <Button
                      link
                      variant="text"
                      type="primary"
                      size="small"
                      color={computedButtonColor("primary")}
                      onClick={(e: MouseEvent) => handleCopyNode(elementSchema)}
                    >
                      复制
                    </Button>
                    <Button
                      link
                      variant="text"
                      type="danger"
                      size="small"
                      color={computedButtonColor("danger")}
                      onClick={(e: MouseEvent) =>
                        handleDeleteNode(elementSchema)
                      }
                    >
                      删除
                    </Button>
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
