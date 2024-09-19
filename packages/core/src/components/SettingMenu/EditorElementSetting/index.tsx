import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElButton,
  ElAlert,
  ElEmpty,
} from "element-plus";
import { defineComponent, inject, ref, watch, h, resolveComponent } from "vue";
import { ElementConfig, IElementBaseSetting } from "@cgx-designer/utils";
import { FocusManage } from "@cgx-designer/hooks";
import componentList from "./ElementPrototype";
import { stringFirstBigger } from "@cgx-designer/utils";
import { commonProps } from "@cgx-designer/utils";
import { IEditorElement } from "@/types";

const Empty = () => {
  return (
    <div class="text-gray-400 text-lg mt-10 h-full flex justify-center items-center">
      <ElEmpty description="请先选择一个组件吧！" />
    </div>
  );
};

const EditElementSetting = defineComponent({
  components: {
    ...componentList,
  },
  setup() {
    const formData = ref<any>(null);
    const elementConfig = inject<ElementConfig>("elementConfig")?.elementMap;
    const focusManage = inject("focusManage") as FocusManage;
    const commands: Record<string, Function> | undefined = inject("commands");
    const component = ref<IElementBaseSetting | null>(null);
    const currentFocusElement = ref<IEditorElement | null>(null);
    //创建动态组件
    const createComponent = (propName: string) => {
      let componentName;
      if (commonProps.includes(propName)) {
        componentName = "Common" + stringFirstBigger(propName);
      } else {
        componentName =
          stringFirstBigger(currentFocusElement.value!.key) +
          stringFirstBigger(propName);
      }
      //如果没有的话 就返回空就行了 不要妨碍下面,我认为是一个保底机制
      if (!Object.keys(componentList).includes(componentName)) {
        return null;
      }
      return h(resolveComponent(componentName));
    };
    watch(
      () => focusManage.focusedElement.value,
      (nv, ov) => {
        //这种情况一般是选中之后又点一下 就是取消了
        if (!nv) {
          component.value = null;
          currentFocusElement.value = nv;
          formData.value = null;
        }
        //正常情况 正常赋值就行
        if (nv) {
          component.value = elementConfig![nv?.key];
          currentFocusElement.value = nv;
          formData.value = nv.props;
        }
      }
    );

    return () => {
      return (
        <div class="h-full overflow-y-auto">
          {!currentFocusElement.value && <Empty />}
          <ElForm label-width="auto">
            {/* 唯一的key值 对上的是目前值的id吧 唯一key */}
            {currentFocusElement.value && (
              <>
                <ElAlert
                  title="id由UUID生成,是每个元素的唯一标识,不支持更改(本来改了也没啥用 小声bb)!"
                  type="warning"
                />
                <ElFormItem label="唯一id" class="mt-3">
                  <ElInput disabled v-model={currentFocusElement.value.id} />
                </ElFormItem>
              </>
            )}
            <div>
              {currentFocusElement.value &&
                Object.keys(currentFocusElement.value!.props).map(
                  (propName) => {
                    return <>{createComponent(propName)}</>;
                  }
                )}
            </div>
            {/* 这是对row的单独处理 */}
            {component.value && component.value.key === "row" && (
              <ElFormItem label="操作">
                <ElButton
                  onClick={() =>
                    commands!.addColForRow(currentFocusElement.value?.id)
                  }
                >
                  新增一个col
                </ElButton>
              </ElFormItem>
            )}
            {component.value &&
              component.value.key === "row" &&
              currentFocusElement!.value!.elementList!.map(
                (col: IEditorElement, index: number) => {
                  return (
                    <>
                      <ElFormItem label={`栅格${index + 1}`}>
                        <ElInputNumber v-model={col.props.span} />
                      </ElFormItem>
                    </>
                  );
                }
              )}
          </ElForm>
        </div>
      );
    };
  },
});

export default EditElementSetting;
