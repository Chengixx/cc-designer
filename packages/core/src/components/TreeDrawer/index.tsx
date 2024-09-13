import { ElDrawer, ElTree } from "element-plus";
import {
  createVNode,
  defineComponent,
  ref,
  render,
  nextTick,
  inject,
} from "vue";
import { ElementManage, FocusManage, TreeNode } from "@cgx-designer/hooks";
interface TreeDrawerExpose {
  showDrawer: Function;
}

const TreeDrawerDom = defineComponent({
  props: {},
  setup(_, ctx) {
    const nodeTree = ref<InstanceType<typeof ElTree>>();
    const isShow = ref<boolean>(false);
    const treeData = ref<TreeNode[]>([]);
    const IElementManage = ref<ElementManage>();
    const IFocusManage = ref<FocusManage>();
    const showDrawer = (
      elementManage: ElementManage,
      focusManage: FocusManage
    ) => {
      isShow.value = true;
      treeData.value = elementManage.getTree();
      IElementManage.value = elementManage;
      IFocusManage.value = focusManage;
      //进来一瞬间要先高亮起来
      const focusElement = focusManage.focusedElement;
      if (focusElement.value) {
        // console.log(focusElement);
        nextTick(() => {
          nodeTree.value?.setCurrentKey(focusElement.value!.id);
        });
      }
    };
    const handleNodeClick = (data: TreeNode) => {
      const element = IElementManage.value!.findElementById(data.id);
      // console.log("点击了", element);
      if (element?.id !== IFocusManage.value?.focusedElement.value?.id) {
        IFocusManage.value!.handleFocus(element!, IElementManage.value!);
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

export const TreeDrawer = (
  elementManage: ElementManage,
  focusManage: FocusManage
) => {
  let el = document.createElement("div");
  let VDom = createVNode(TreeDrawerDom);
  document.body.appendChild((render(VDom, el), el));
  let { showDrawer } = VDom.component!.exposed as TreeDrawerExpose;
  showDrawer(elementManage, focusManage);
};
