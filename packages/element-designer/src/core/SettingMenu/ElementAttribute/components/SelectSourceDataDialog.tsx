import { ref, defineComponent, inject } from "vue";
import { elementController } from "@cgx-designer/controller";
import { SourceDataManage } from "@cgx-designer/hooks";
import { dataSourceColor } from "../../../../constant/index";
import { MonacoIDE } from "@cgx-designer/extensions";
import { IAttributeSchema } from "@cgx-designer/types";
import { IBindSourceData } from "@cgx-designer/reactivity";
import { deepClone } from "@cgx-designer/utils";
import { VBtnColorType } from "@cgx-designer/base-materials";

export interface SelectSourceDataDialogExpose {
  handleOpen: (
    attributeConfig: IAttributeSchema,
    elementAttrObj?: IBindSourceData
  ) => void;
}

export const SelectSourceDataDialog = defineComponent({
  name: "SelectSourceDataDialog",
  emits: ["confirm", "remove"],
  setup(_, { expose, emit }) {
    const Button = elementController.getElementRender("button");
    const Dialog = elementController.getElementRender("dialog");
    const sourceDataManage = inject("sourceDataManage") as SourceDataManage;
    //这个属性仅仅用于解除绑定
    const innerAttributeConfig = ref<IAttributeSchema>();
    const currentSelectIndex = ref<number>(-1);
    const sourceDataName = ref<string>("");
    const isShow = ref<boolean>(false);
    const innerElementAttrObj = ref<IBindSourceData>();

    const handleOpen = (
      attributeConfig: IAttributeSchema,
      elementAttrObj?: IBindSourceData
    ) => {
      //记得清空
      currentSelectIndex.value = -1;
      innerElementAttrObj.value = undefined;
      sourceDataName.value = "";
      isShow.value = true;
      innerAttributeConfig.value = attributeConfig;
      if (elementAttrObj) {
        sourceDataName.value = elementAttrObj.value;
        innerElementAttrObj.value = deepClone(elementAttrObj);
        currentSelectIndex.value = sourceDataManage.sourceData.value.findIndex(
          (dataItem) => dataItem.name === elementAttrObj.value
        );
      }
    };
    const handleCancel = () => {
      isShow.value = false;
    };
    const handleConfirm = () => {
      isShow.value = false;
      const confirmData = {
        name: sourceDataName.value,
        attributeConfig: innerAttributeConfig.value,
      };
      emit("confirm", confirmData);
    };
    const handleRemove = () => {
      isShow.value = false;
      const removeData = {
        attributeConfig: innerAttributeConfig.value,
        elementAttrObj: innerElementAttrObj.value,
      };
      emit("remove", removeData);
    };
    expose({
      handleOpen,
    });
    return () => (
      <Dialog
        title="绑定数据源"
        v-model={isShow.value}
        destroyOnClose
        style={{
          marginTop: "5vh !important",
        }}
      >
        {{
          default: () => (
            <div class="c-h-[70vh] c-overflow-y-auto c-flex">
              <div class="c-w-[240px] c-border dark:c-border-darkMode">
                <div class="c-w-full c-h-10 c-flex c-justify-center c-items-center c-border-b dark:c-border-darkMode">
                  变量列表
                </div>
                {sourceDataManage.sourceData.value.map(
                  (dataItem, dataIndex) => {
                    return (
                      <div
                        onClick={() => {
                          sourceDataName.value = dataItem.name;
                          currentSelectIndex.value = dataIndex;
                        }}
                        class={[
                          "c-h-8 c-w-full c-cursor-pointer c-px-3 c-py-1 c-flex c-justify-between c-items-center c-border-b c-border-dashed hover:c-bg-gray-100 dark:hover:c-bg-gray-600 dark:c-border-darkMode",
                          currentSelectIndex.value === dataIndex &&
                            "c-bg-gray-100 dark:c-bg-gray-600",
                        ]}
                      >
                        <div class="c-flex c-justify-center c-items-center c-gap-x-1 c-select-none">
                          <span
                            style={{
                              color: dataSourceColor[dataItem.type],
                              marginRight: "4px",
                            }}
                          >
                            {dataItem.type}
                          </span>
                          <span>{dataItem.name}</span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <div class="c-flex-1 c-ml-2 c-border c-p-2 c-h-full dark:c-border-darkMode">
                <MonacoIDE v-model={sourceDataName.value} />
              </div>
            </div>
          ),
          footer: () => (
            <>
              <Button onClick={handleCancel}>取消</Button>
              {innerElementAttrObj.value && (
                <Button
                  type="danger"
                  color={VBtnColorType.danger}
                  onClick={handleRemove}
                >
                  移除绑定
                </Button>
              )}

              <Button type="primary" onClick={handleConfirm}>
                确定
              </Button>
            </>
          ),
        }}
      </Dialog>
    );
  },
});
