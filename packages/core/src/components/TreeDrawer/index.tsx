import { ElButton, ElDrawer, ElTree } from "element-plus";
import { defineComponent, ref, nextTick, inject } from "vue";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IEditorElement, TreeNode } from "../../types";
import type Node from "element-plus/es/components/tree/src/model/node";
import { deepClone } from "@cgx-designer/utils";

const TreeDrawer = defineComponent({
  setup(_, ctx) {
    const nodeTree = ref<InstanceType<typeof ElTree>>();
    const isShow = ref<boolean>(false);
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const commands = inject("commands") as Record<string, Function> | null;
    const showDrawer = () => {
      isShow.value = true;
      //进来一瞬间要先高亮起来
      const focusElement = focusManage.focusedElement;
      if (focusElement.value) {
        nextTick(() => {
          nodeTree.value?.setCurrentKey(focusElement.value!.id);
        });
      }
    };
    const handleNodeClick = (data: TreeNode) => {
      const element = elementManage.findElementById(data.id);
      if (
        focusManage.focusedElement.value ||
        element?.id !== focusManage.focusedElement.value!.id
      ) {
        focusManage.handleFocus(element!);
      }
    };

    const handleDeleteNode = (e: MouseEvent, _: Node, data: IEditorElement) => {
      e.stopPropagation();
      commands!.handleDelete(data.id);
    };

    const handleCopyNode = (e: MouseEvent, _: Node, data: IEditorElement) => {
      e.stopPropagation();
      const newElementSchema = elementManage.deepCopyElement(deepClone(data));
      commands!.handleLastAdd(newElementSchema);
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
                data={elementManage.elementList.value}
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
                    <div class="c-flex c-flex-1 c-justify-between c-items-center c-pr-2">
                      <span>
                        {node.label}{" "}
                        <span class="c-text-gray-400">{data.id}</span>
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

export default TreeDrawer;
