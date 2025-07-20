import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { getRandomId } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { computed, defineComponent, inject, PropType, ref } from "vue";
import { VBtnColorType, vuetifyConfig } from "@cgx-designer/base-materials";
import { Divider } from "@cgx-designer/extensions";
import { ClearIcon } from "@cgx-designer/icons";

const TabList = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(_, { attrs }) {
    const Button = elementController.getElementRender("button");
    const Input = elementController.getElementRender("input");
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const bindValue = ref<IEditorElement[]>(
      attrs.modelValue as IEditorElement[]
    );
    const parentTab = computed(() => {
      if (!bindValue.value.length) return null;
      const pTab = elementManage.getParentElementById(bindValue.value[0].id!);
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
        <Divider label="标签配置" />
        <div class="c-mt-2">
          {bindValue.value.map((tabPane, index) => {
            return (
              <div
                key={tabPane.id}
                class="c-w-full c-flex c-items-center c-mb-2"
              >
                <div class="c-ml-1">
                  <Input
                    v-model={tabPane.props!.label}
                    placeholder="标签名称"
                    {...vuetifyConfig}
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
                <div
                  class="c-ml-2 c-cursor-pointer c-flex c-items-center"
                  onClick={(_) => handleDeleteTab(index)}
                  title="删除组件"
                >
                  <ClearIcon class="c-h-4 c-w-4 dark:c-fill-white hover:c-fill-blue-500 dark:hover:c-fill-blue-500 c-cursor-pointer" />
                </div>
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
