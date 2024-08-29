import { ElDrawer, ElTree } from "element-plus";
import { createVNode, defineComponent, ref, render, nextTick } from "vue";
import { TreeNode, useElementStore } from "@/store/modules/element";
import useFocus from "@/hook/useFocus";
interface TreeDrawerExpose {
  showDrawer: Function;
}

const TreeDrawerDom = defineComponent({
  props: {},
  setup(_, ctx) {
    const nodeTree = ref<InstanceType<typeof ElTree>>();
    const { getTree, findElementById } = useElementStore();
    const { handleElementClick, getFocusElement } = useFocus();
    const isShow = ref<boolean>(false);
    const treeData = ref<TreeNode[]>([]);
    const showDrawer = () => {
      isShow.value = true;
      treeData.value = getTree();
      //进来一瞬间要先高亮起来
      const focusElement = getFocusElement();
      if (focusElement) {
        // console.log(focusElement);
        nextTick(() => {
          nodeTree.value?.setCurrentKey(focusElement.id);
        });
      }
    };
    const handleNodeClick = (data: TreeNode) => {
      const element = findElementById(data.id);
      // console.log("点击了", element);
      if (!element?.focus) {
        handleElementClick(element!);
      }
    };
    ctx.expose({
      showDrawer,
    });
    return () => {
      return (
        <ElDrawer v-model={isShow.value} size={"15%"}>
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
                data={treeData.value}
                node-key="id"
                props={{ label: "key", children: "children" }}
              />
            ),
          }}
        </ElDrawer>
      );
    };
  },
});

export const TreeDrawer = () => {
  let el = document.createElement("div");
  let VDom = createVNode(TreeDrawerDom);
  document.body.appendChild((render(VDom, el), el));
  let { showDrawer } = VDom.component!.exposed as TreeDrawerExpose;
  showDrawer();
};
