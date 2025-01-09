import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IEditorElement } from "../../types";
import { getRandomId } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { Delete } from "@element-plus/icons-vue";
import { ElDivider, ElIcon, ElInput, ElTooltip } from "element-plus";
import { computed, defineComponent, inject, PropType, ref } from "vue";
import { VBtnColorType } from "@cgx-designer/materials";

const TabList = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(_, { attrs }) {
    const Button = elementController.getElementRender("button");
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const bindValue = ref<IEditorElement[]>(
      attrs.modelValue as IEditorElement[]
    );
    const parentTab = computed(() => {
      if (!bindValue.value.length) return null;
      const pTab = elementManage.findParentElementById(bindValue.value[0].id!);
      return pTab;
    });

    const handleDeleteTab = (index: number) => {
      //删除完之后如果长度为0 全部删除
      if (bindValue.value.length == 1) {
        elementManage.deleteElementById(parentTab.value!.id!);
        focusManage.focusedElement.value = null;
        return;
      }
      bindValue.value.splice(index, 1);
    };

    const handleAddTab = () => {
      let tabPaneSchema =
        elementController.elementTemplate["tabPane"](getRandomId);
      tabPaneSchema.props!.label = `标签${bindValue.value.length + 1}`;
      tabPaneSchema.props!.name = `标签${bindValue.value.length + 1}`;
      bindValue.value.push(tabPaneSchema);
    };

    const handleSetTabActiveName = (tabPaneSchema: IEditorElement) => {
      if (parentTab.value) {
        parentTab.value.props!.activeName = tabPaneSchema.props!.name;
      }
    };
    return () => (
      <div class="c-w-full">
        <ElDivider content-position="center">标签配置</ElDivider>
        <div class="c-mt-2">
          {bindValue.value.map((tabPane, index) => {
            return (
              <div
                key={tabPane.id}
                class="c-w-full c-flex c-items-center c-mb-2"
              >
                <div class="c-ml-1">
                  <ElInput
                    v-model={tabPane.props!.label}
                    placeholder="标签名称"
                  />
                </div>
                <div class="c-ml-1">
                  <Button
                    link
                    color={VBtnColorType.primary}
                    type="primary"
                    onClick={() => handleSetTabActiveName(tabPane)}
                  >
                    设为默认
                  </Button>
                </div>
                <ElTooltip effect="dark" content="删除组件" placement="bottom">
                  <div
                    class="c-ml-2 c-cursor-pointer c-flex c-items-center"
                    onClick={(_) => handleDeleteTab(index)}
                  >
                    <ElIcon>
                      <Delete />
                    </ElIcon>
                  </div>
                </ElTooltip>
              </div>
            );
          })}
          <Button
            link
            type="primary"
            color={VBtnColorType.primary}
            onClick={handleAddTab}
          >
            新增标签
          </Button>
        </div>
      </div>
    );
  },
});

export default TabList;
