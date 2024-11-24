import { ElButton, ElDrawer, ElTree } from "element-plus";
import { createVNode, defineComponent, ref, render, nextTick } from "vue";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IEditorElement, TreeNode } from "../../types";
import type Node from "element-plus/es/components/tree/src/model/node";
import { deepClone, getRandomId } from "@cgx-designer/utils";

interface TreeDrawerExpose {
  showDrawer: Function;
}

const TreeDrawerDom = defineComponent({
  props: {},
  setup(_, ctx) {
    const nodeTree = ref<InstanceType<typeof ElTree>>();
    const isShow = ref<boolean>(false);
    const IElementManage = ref<ElementManage>();
    const IFocusManage = ref<FocusManage>();
    const ICommand = ref<Record<string, Function> | null>();
    const showDrawer = (
      elementManage: ElementManage,
      focusManage: FocusManage,
      commands: Record<string, Function>
    ) => {
      isShow.value = true;
      IElementManage.value = elementManage;
      IFocusManage.value = focusManage;
      ICommand.value = commands;
      //进来一瞬间要先高亮起来
      const focusElement = focusManage.focusedElement;
      if (focusElement.value) {
        nextTick(() => {
          nodeTree.value?.setCurrentKey(focusElement.value!.id);
        });
      }
    };
    const handleNodeClick = (data: TreeNode) => {
      const element = IElementManage.value!.findElementById(data.id);
      if (
        !IFocusManage.value?.focusedElement ||
        element?.id !== IFocusManage.value?.focusedElement.value?.id
      ) {
        IFocusManage.value!.handleFocus(element!);
      }
    };

    const handleDeleteNode = (
      e: MouseEvent,
      node: Node,
      data: IEditorElement
    ) => {
      e.stopPropagation();
      // IElementManage.value!.deleteElementById(data.id!);
      ICommand.value!.handleDelete(data.id);
    };

    const handleCopyNode = (
      e: MouseEvent,
      node: Node,
      data: IEditorElement
    ) => {
      e.stopPropagation();
      const id = getRandomId();
      ICommand.value!.handleLastAdd(
        deepClone({
          ...data,
          id,
          field: data.key + "-" + id,
        })
      );
    };

    const IsAllowDrop = (
      _: Node,
      dropNode: Node,
      type: "prev" | "inner" | "next"
    ) => {
      if (type === "inner") {
        //!只有是容器的情况才能放进去
        const dropContainerList: string[] = ["card", "col"];
        if (!dropContainerList.includes(dropNode.label)) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };
    ctx.expose({
      showDrawer,
    });
    return () => {
      return (
        <ElDrawer v-model={isShow.value} size={"25%"}>
          {{
            header: () => <h2>组件结构图</h2>,
            default: () => (
              <ElTree
                ref={nodeTree}
                default-expand-all
                highlight-current
                class="node-tree"
                icon-class="el-icon-arrow-right"
                onNode-click={handleNodeClick}
                draggable
                data={
                  IElementManage.value?.elementList as
                    | IEditorElement[]
                    | undefined
                }
                node-key="id"
                props={{ label: "key", children: "elementList" }}
                allowDrop={IsAllowDrop}
              >
                {{
                  default: ({
                    node,
                    data,
                  }: {
                    node: Node;
                    data: IEditorElement;
                  }) => (
                    <div class="flex flex-1 justify-between items-center pr-2">
                      <span>
                        {node.label}{" "}
                        <span class="text-gray-400">{data.id}</span>
                      </span>
                      <div>
                        <ElButton
                          link
                          type="primary"
                          onClick={(e: MouseEvent) =>
                            handleCopyNode(e, node, data)
                          }
                        >
                          复制
                        </ElButton>
                        <ElButton
                          link
                          type="danger"
                          onClick={(e: MouseEvent) =>
                            handleDeleteNode(e, node, data)
                          }
                        >
                          删除
                        </ElButton>
                      </div>
                    </div>
                  ),
                }}
              </ElTree>
            ),
          }}
        </ElDrawer>
      );
    };
  },
});

export const TreeDrawer = (
  elementManage: ElementManage,
  focusManage: FocusManage,
  commands: Record<string, Function>
) => {
  let el = document.createElement("div");
  let VDom = createVNode(TreeDrawerDom);
  document.body.appendChild((render(VDom, el), el));
  let { showDrawer } = VDom.component!.exposed as TreeDrawerExpose;
  showDrawer(elementManage, focusManage, commands);
};
