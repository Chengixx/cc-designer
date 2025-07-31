import { ref, defineComponent, inject } from "vue";
import { elementController } from "@cgx-designer/controller";
import { SourceDataItem, SourceDataManage } from "@cgx-designer/hooks";
import { CFormItem, MonacoIDE } from "@cgx-designer/extensions";

export const CreateRefDialog = defineComponent({
  setup(_, { expose }) {
    const Button = elementController.getElementRender("button");
    const Dialog = elementController.getElementRender("dialog");
    const Input = elementController.getElementRender("input");
    const sourceDataManager = inject("sourceDataManager") as SourceDataManage;
    const dialogTitle = ref<string>("新增数据源");
    const initialValue = ref<string>("");
    const innerDataIndex = ref<number>(-1);
    const dataName = ref<string>("");
    const isShow = ref<boolean>(false);
    const handleOpen = (dataItem?: SourceDataItem, dataIndex?: number) => {
      //清空
      dataName.value = "";
      initialValue.value = "";
      innerDataIndex.value = -1;
      isShow.value = true;
      if (dataItem) {
        dialogTitle.value = "编辑数据源";
        dataName.value = dataItem.name;
        initialValue.value = JSON.stringify(dataItem.instance.initialValue);
        innerDataIndex.value = dataIndex!;
      } else {
        dialogTitle.value = "新增数据源";
      }
    };
    const handleCancel = () => {
      isShow.value = false;
    };
    const handleConfirm = () => {
      dialogTitle.value === "新增数据源"
        ? sourceDataManager.addSourceData(
            "ref",
            dataName.value,
            JSON.parse(initialValue.value)
          )
        : sourceDataManager.editSourceData(
            innerDataIndex.value,
            dataName.value,
            JSON.parse(initialValue.value)
          );
      isShow.value = false;
    };
    expose({
      handleOpen,
    });
    return () => (
      <Dialog
        title={dialogTitle.value}
        v-model={isShow.value}
        destroyOnClose
        style={{
          marginTop: "5vh !important",
        }}
      >
        {{
          default: () => (
            <div class="c-h-[70vh] c-overflow-y-auto">
              <CFormItem label="数据源名称" labelCol={4}>
                <Input v-model={dataName.value} />
              </CFormItem>
              <div class="c-mb-1 c-font-medium c-text-sm c-text-gray-600 c-flex c-items-center dark:c-text-gray-300">
                数据源初始值
              </div>
              <MonacoIDE v-model={initialValue.value} mode="javaScript" />
            </div>
          ),
          footer: () => (
            <>
              <Button onClick={handleCancel}>取消</Button>
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
