import {
  ElButton,
  ElDialog,
  ElEmpty,
  ElMessage,
  ElTabPane,
  ElTabs,
  ElTree,
  TabPaneName,
} from "element-plus";
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  reactive,
  ref,
  toRaw,
} from "vue";
import ScriptIDE from "./ScriptIDE";
import { ElementManage, FunctionManage } from "@cgx-designer/hooks";
import MethodsList from "./MethodsList";
import { EventInstance, IEditorElement } from "../../../types";
import { deepClone, getRandomId } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import ElementIDE from "./ElementIDE";

const EventSettingDialog = defineComponent({
  emits: ["add", "edit"],
  setup(_, { expose, emit }) {
    const functionManage = inject("functionManage") as FunctionManage;
    const elementManage = inject("elementManage") as ElementManage;
    const nodeTree = ref<InstanceType<typeof ElTree>>();
    const dialogShow = ref<boolean>(false);
    const isAdd = ref<boolean>(true);
    //实例
    const eventInstance = reactive<EventInstance>({
      //事件的类型
      type: "custom",
      //当前选中的方法
      methodName: "lcc1",
      //如果是组件的话 组件的id
      componentId: null,
    });
    //缓存
    const cacheData = ref<any>({});
    //当前选中的组件
    const elementSchema = ref<IEditorElement | null>(null);
    //当前选中的组件（tree）
    //渲染的方法列表 拿来用的
    const methodsList = computed(() => {
      //用户自己写的script的情况
      if (eventInstance.type === "custom") {
        return Object.entries(functionManage.functionsList.value)
          .filter(([_key, value]) => typeof value === "function")
          .map(([label]) => ({ label, value: label }));
      }
      //组件的情况
      if (eventInstance.type === "component") {
        if (elementSchema.value) {
          const elementMethodsList = elementController.elementConfigMap[
            elementSchema.value.key
          ].config!.action?.map((item) => ({
            label: item.describe,
            value: item.type,
          }));
          //给一个保底机制
          return elementMethodsList ?? [];
        }
        return [];
      }
    });
    //有参数的列表的用这个
    const actionArgsConfigs = computed(() => {
      if (eventInstance.type === "component") {
        if (elementSchema.value) {
          const action =
            elementController.elementConfigMap[elementSchema.value.key].config!
              .action;
          const actionItem = action?.find(
            (item) => item.type === eventInstance.methodName
          );

          if (actionItem?.argsConfigs) {
            const index = actionItem.argsConfigs.findIndex(
              (item: any) => item.label === "设置数据"
            );
            index !== -1 &&
              (actionItem.argsConfigs[index] = {
                ...elementSchema.value,
                label: "设置数据",
                field: "0",
                id: getRandomId(),
              } as IEditorElement);
          }

          return actionItem?.argsConfigs ?? [];
        }
      }
      return [];
    });
    //选中组件
    const handleNodeClick = (data: IEditorElement) => {
      //切换的时候 如果已经有arg 要存一下 因为切换的时候会清空
      if (eventInstance.args) {
        cacheData.value[eventInstance.componentId! + eventInstance.methodName] =
          eventInstance.args;
        // console.log("存下了", cacheData.value);
      }

      eventInstance.componentId = data.id;
      eventInstance.type = "component";
      eventInstance.methodName = null;
      elementSchema.value = data;
    };
    //选中方法
    const handleSelectMethod = (method: string) => {
      eventInstance.methodName = method;
      eventInstance.args =
        cacheData.value[eventInstance.componentId + eventInstance.methodName];
    };
    //切换tab
    const handleChangeMethodType = (e: TabPaneName) => {
      eventInstance.componentId = null;
      eventInstance.type = e as string;
      eventInstance.methodName = null;
      elementSchema.value = null;
    };

    //dialog的方法
    const handleConfirm = () => {
      if (!eventInstance.methodName) {
        ElMessage.warning("请先选择一个方法才能保存哦~");
        return;
      }
      emit(isAdd.value ? "add" : "edit", deepClone(toRaw(eventInstance)));
      handleClose();
    };
    const handleOpen = (
      flag: "add" | "edit",
      newEventInstance?: EventInstance
    ) => {
      dialogShow.value = true;
      if (flag === "add") {
        isAdd.value = true;
        eventInstance.type = "custom";
        eventInstance.componentId = null;
        if (methodsList.value?.length) {
          handleSelectMethod(methodsList.value[0].value);
        }
      }
      if (flag === "edit") {
        isAdd.value = false;
        elementSchema.value = null;
        if (newEventInstance!.componentId) {
          //这就是说明是组件联动的
          const newElementSchema = elementManage.findElementById(
            newEventInstance!.componentId
          );
          elementSchema.value = newElementSchema;
        }

        nextTick(() => {
          eventInstance.componentId = newEventInstance!.componentId;
          eventInstance.methodName = newEventInstance!.methodName;
          eventInstance.type = newEventInstance!.type;
          eventInstance.args = newEventInstance!.args;
          nodeTree.value?.setCurrentKey(newEventInstance!.componentId!);
        });
      }
    };
    const handleClose = () => {
      dialogShow.value = false;
    };

    expose({
      handleOpen,
      handleClose,
    });
    return () => (
      <ElDialog
        destroyOnClose
        v-model={dialogShow.value}
        title="组件事件编辑"
        style={{
          marginTop: "5vh !important",
          width: "65vw !important",
        }}
      >
        {{
          default: () => {
            return (
              <div class="c-h-[70vh] c-overflow-y-auto c-flex">
                <div class="c-w-[240px] c-border dark:c-border-darkMode">
                  <ElTabs
                    v-model={eventInstance.type}
                    stretch
                    onTabChange={(e: TabPaneName) => handleChangeMethodType(e)}
                  >
                    <ElTabPane label="自定义事件" name="custom">
                      <div class="c-px-2 c-pt-2">
                        <MethodsList
                          methodsList={methodsList.value}
                          currentMethod={eventInstance.methodName!}
                          onSelect={(v) => handleSelectMethod(v)}
                        />
                      </div>
                    </ElTabPane>
                    <ElTabPane label="组件联动" name="component">
                      <div class="c-px-2 c-pt-2 c-flex c-flex-col c-h-[calc(70vh-40px-.5rem)]">
                        <div class="c-h-[40vh] c-overflow-y-auto c-w-full c-border-b dark:c-border-darkMode">
                          <ElTree
                            ref={nodeTree}
                            default-expand-all
                            highlight-current
                            class="node-tree"
                            icon-class="el-icon-arrow-right"
                            onNode-click={handleNodeClick}
                            data={elementManage.elementList.value}
                            node-key="id"
                            props={{ label: "key", children: "elementList" }}
                          />
                        </div>
                        <div class="c-w-full c-flex-1 c-overflow-y-auto">
                          <MethodsList
                            methodsList={methodsList.value}
                            currentMethod={eventInstance.methodName!}
                            onSelect={(v) => handleSelectMethod(v)}
                          />
                        </div>
                      </div>
                    </ElTabPane>
                  </ElTabs>
                </div>
                <div class="c-flex-1 c-ml-2 c-border c-p-2 c-h-full dark:c-border-darkMode">
                  {eventInstance.type === "custom" ? (
                    <>
                      <ScriptIDE />
                    </>
                  ) : (
                    <>
                      {!actionArgsConfigs.value.length ? (
                        <div>
                          <ElEmpty description="暂无配置" />
                        </div>
                      ) : (
                        <ElementIDE
                          modelValue={eventInstance.args}
                          onUpdateModelValue={(v) => (eventInstance.args = v)}
                          actionArgsConfigs={actionArgsConfigs.value}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          },
          footer: () => {
            return (
              <>
                <ElButton onClick={handleClose}>取消</ElButton>
                <ElButton type="primary" onClick={handleConfirm}>
                  确定
                </ElButton>
              </>
            );
          },
        }}
      </ElDialog>
    );
  },
});

export default EventSettingDialog;
