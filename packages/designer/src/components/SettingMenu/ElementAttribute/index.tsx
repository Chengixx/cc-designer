import { ElementEngine } from "@cgx-designer/engine";
import { IEditorElement } from "../../../../../types";
import {
  FocusManage,
  SourceDataManage,
  ElementManage,
} from "@cgx-designer/hooks";
import { setValueByPath } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { defineComponent, Fragment, inject, ref, watch } from "vue";
import { deepClone, getValueByPath } from "@cgx-designer/utils";
import { vuetifyProps } from "@cgx-designer/materials";
import { Empty } from "@cgx-designer/extensions";
import { CFormItem } from "@cgx-designer/extensions";
import { BindIcon } from "@cgx-designer/icons";
import {
  SelectSourceDataDialog,
  SelectSourceDataDialogExpose,
} from "./components/SelectSourceDataDialog";

const ElementAttribute = defineComponent({
  setup() {
    const elementControllerMap = elementController.elementConfigMap;
    const focusManage = inject("focusManage") as FocusManage;
    const elementManage = inject("elementManage") as ElementManage;
    const sourceDataManage = inject("sourceDataManage") as SourceDataManage;
    const SelectSourceDataDialogRef = ref<SelectSourceDataDialogExpose | null>(
      null
    );
    const currentFocusElement = ref<IEditorElement | null>(null);
    // 获取当前选中元素的属性
    const componentAttributes = ref<IEditorElement[]>([]);
    //是否显示通过回调函数来做
    const showAttributeConfigWidget = (attributeConfig: IEditorElement) => {
      let show: boolean = true;
      if (typeof attributeConfig.show === "boolean") {
        show = attributeConfig.show;
      }

      if (typeof attributeConfig.show === "function") {
        show = attributeConfig.show({ values: currentFocusElement.value });
      }

      return show;
    };
    //更新值
    const handleSetValue = (
      value: any,
      field: string,
      attributeConfig: IEditorElement,
      editData = currentFocusElement.value
    ) => {
      if (typeof attributeConfig.onChange === "function") {
        attributeConfig.onChange({ value, values: editData });
      }
      setValueByPath(currentFocusElement.value!, field, value);
    };
    watch(
      () => focusManage.focusedElement.value,
      (nv) => {
        //这种情况一般是选中之后又点一下 就是取消了
        if (!nv) {
          componentAttributes.value = [];
          currentFocusElement.value = null;
        }
        //正常情况 正常赋值就行
        if (nv) {
          currentFocusElement.value = nv;
          //保底机制
          const attributes =
            elementControllerMap![nv.key].config!.attribute || [];
          componentAttributes.value = deepClone(attributes);
        }
      },
      //注意此处必须立刻监听 否则vue会使用上一次的组件
      { immediate: true }
    );

    const handleBindSourceData = (
      name: string,
      attributeConfig: IEditorElement
    ) => {
      //首先先把值改成当前数据源的值
      const instance = sourceDataManage.getSourceData(name);
      handleSetValue(
        instance.initialValue,
        attributeConfig.field!,
        attributeConfig
      );
      const componentId = currentFocusElement.value?.id!;
      //然后往数据源中添加依赖
      instance.addDeps(
        currentFocusElement.value!.id! + attributeConfig.field!,
        {
          type: "component",
          componentId,
          attrName: attributeConfig.field!,
        }
      );
    };
    return () => (
      <>
        {/* // !此处不给key值vue会重复利用上一次的 是不行的 */}
        <div key={currentFocusElement.value?.id}>
          {!componentAttributes.value.length && <Empty />}
          {componentAttributes.value.map((attributeConfig) => {
            return (
              <Fragment key={attributeConfig.field}>
                {showAttributeConfigWidget(attributeConfig) && (
                  <CFormItem label={attributeConfig.label || undefined}>
                    {{
                      default: () => {
                        return (
                          <ElementEngine
                            modelValue={getValueByPath(
                              currentFocusElement.value!,
                              attributeConfig.field!
                            )}
                            elementSchema={{
                              ...attributeConfig,
                              props: {
                                ...attributeConfig.props,
                                ...(attributeConfig.field ===
                                "props.defaultValue"
                                  ? currentFocusElement.value?.props
                                  : { ...vuetifyProps(attributeConfig.key) }),
                              },
                              field: undefined,
                              formItem: false,
                            }}
                            onUpdate:modelValue={(value) =>
                              handleSetValue(
                                value,
                                attributeConfig.field!,
                                attributeConfig
                              )
                            }
                          />
                        );
                      },
                      extra: () => {
                        return (
                          <div
                            class="c-ml-1"
                            onClick={() => {
                              SelectSourceDataDialogRef.value?.handleOpen(
                                attributeConfig
                              );
                            }}
                          >
                            <BindIcon class="c-w-5 c-h-5 dark:c-fill-white c-cursor-pointer" />
                          </div>
                        );
                      },
                    }}
                  </CFormItem>
                )}
              </Fragment>
            );
          })}
        </div>
        {/* 选择dialog */}
        <SelectSourceDataDialog
          ref={SelectSourceDataDialogRef}
          onConfirm={({ name, attributeConfig }) =>
            handleBindSourceData(name, attributeConfig)
          }
        />
      </>
    );
  },
});

export default ElementAttribute;
