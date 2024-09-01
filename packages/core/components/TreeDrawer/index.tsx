import { ElDrawer, ElTree } from "element-plus";
import { createVNode, defineComponent, ref, render, nextTick, inject } from "vue";
import { FocusManage } from "@cgx-designer/hooks";
import { ElementManage, TreeNode } from "@cgx-designer/hooks";
interface TreeDrawerExpose {
  showDrawer: Function;
}

const TreeDrawerDom = defineComponent({
  props: {},
  setup(_, ctx) {
    const nodeTree = ref<InstanceType<typeof ElTree>>();
    const focusManage = inject("focusManage") as FocusManage
    const isShow = ref<boolean>(false);
    const treeData = ref<TreeNode[]>([]);
    const IElementManage = ref<ElementManage>();
    const showDrawer = (elementManage: ElementManage) => {
      isShow.value = true;
      treeData.value = elementManage.getTree();
      IElementManage.value = elementManage
      //进来一瞬间要先高亮起来
      const focusElement = focusManage.getFocusElement();
      if (focusElement) {
        // console.log(focusElement);
        nextTick(() => {
          nodeTree.value?.setCurrentKey(focusElement.id);
        });
      }
    };
    const handleNodeClick = (data: TreeNode) => {
      const element = IElementManage.value!.findElementById(data.id);
      // console.log("点击了", element);
      if (!element?.focus) {
        focusManage.handleElementClick(element!);
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

export const TreeDrawer = (elementManage: ElementManage) => {
  let el = document.createElement("div");
  let VDom = createVNode(TreeDrawerDom);
  document.body.appendChild((render(VDom, el), el));
  let { showDrawer } = VDom.component!.exposed as TreeDrawerExpose;
  showDrawer(elementManage);
};
