import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IEditorElement } from "../../types";
import { elementController, getRandomId } from "@cgx-designer/utils";
import { Delete } from "@element-plus/icons-vue";
import { ElButton, ElDivider, ElIcon, ElInput, ElTooltip } from "element-plus";
import { computed, defineComponent, inject, PropType, ref } from "vue";

const TabList = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(_, { attrs }) {
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
      <div class="w-full">
        <ElDivider content-position="center">标签管理</ElDivider>
        <div class="mt-2">
          {bindValue.value.map((tabPane, index) => {
            return (
              <div key={tabPane.id} class="w-full flex items-center mb-2">
                <div class="ml-1">
                  <ElInput
                    v-model={tabPane.props!.label}
                    placeholder="标签名称"
                  />
                </div>
                <div class="ml-1">
                  <ElButton
                    link
                    type="primary"
                    onClick={(_) => handleSetTabActiveName(tabPane)}
                  >
                    设为默认
                  </ElButton>
                </div>
                <ElTooltip effect="dark" content="删除组件" placement="bottom">
                  <div
                    class="ml-2 cursor-pointer flex items-center"
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
          <ElButton link type="primary" onClick={handleAddTab}>
            新增标签
          </ElButton>
        </div>
      </div>
    );
  },
});

export default TabList;
