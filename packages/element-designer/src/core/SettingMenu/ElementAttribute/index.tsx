import { ElementEngine } from "@cgx-designer/element-engine";
import { IAttributeSchema, IElementSchema } from "@cgx-designer/types";
import {
  FocusManage,
  QueueManage,
  SourceDataManage,
} from "@cgx-designer/hooks";
import { setValueByPath, copyToClipboard } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { defineComponent, Fragment, inject, ref, render, watch } from "vue";
import { deepClone, getValueByPath } from "@cgx-designer/utils";
import { vuetifyProps } from "@cgx-designer/base-materials";
import { CIcon, Empty } from "@cgx-designer/extensions";
import { CFormItem, Message } from "@cgx-designer/extensions";
import { BindIcon, ClipBoardIcon } from "@cgx-designer/icons";
import {
  SelectSourceDataDialog,
  SelectSourceDataDialogExpose,
} from "./components/SelectSourceDataDialog";
import {
  isValueIsSourceData,
  isAttrIsSourceData,
} from "@cgx-designer/reactivity";
import { isEqual } from "lodash-es";

const ElementAttribute = defineComponent({
  setup() {
    const elementControllerMap = elementController.elementConfigMap;
    const focusManage = inject("focusManage") as FocusManage;
    const sourceDataManage = inject("sourceDataManage") as SourceDataManage;
    const queueManage = inject("queueManage") as QueueManage;
    const SelectSourceDataDialogRef = ref<SelectSourceDataDialogExpose | null>(
      null
    );
    const currentFocusElement = ref<IElementSchema | null>(null);
    // 获取当前选中元素的属性
    const componentAttributes = ref<IAttributeSchema[]>([]);
    //判断是否是数据源
    const getisValueIsSourceData = (attributeConfig: IAttributeSchema) => {
      const value = getValueByPath(
        currentFocusElement.value!,
        attributeConfig.field!
      );
      return isValueIsSourceData(value);
    };
    //是否显示通过回调函数来做
    const showAttributeConfigWidget = (attributeConfig: IAttributeSchema) => {
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
      attributeConfig: IAttributeSchema,
      editData = currentFocusElement.value
    ) => {
      //先判断两个值是不是本来就一样了 如果一样 下面的就不用走了,记得不能用=== 要用isEqual，不然可能是对象
      if (isEqual(getValueByPath(currentFocusElement.value!, field), value))
        return;
      if (typeof attributeConfig.onChange === "function") {
        attributeConfig.onChange({ value, values: editData });
      }
      setValueByPath(currentFocusElement.value!, field, value);
      queueManage.push("elementAttribute");
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
    //绑定数据源
    const handleBindSourceData = (
      name: string,
      attributeConfig: IAttributeSchema
    ) => {
      //首先先把值改成当前数据源的值
      const sourceDataItem = sourceDataManage.getSourceData(name);
      handleSetValue(
        {
          type: "sourceData",
          dataType: sourceDataItem.type,
          value: name,
        },
        attributeConfig.field!,
        attributeConfig
      );
      const componentId = currentFocusElement.value?.id!;
      //然后往数据源中添加依赖
      sourceDataItem.instance.addDeps({
        key: currentFocusElement.value!.id! + attributeConfig.field!,
        type: "component",
        componentId,
        attrName: attributeConfig.field!,
      });
      queueManage.push("bindSourceData");
    };

    //渲染额外小icon
    const renderExtraWidget = (attributeConfig: IAttributeSchema) => {
      const showExtra = attributeConfig.showExtra;

      if (showExtra === "copy") {
        return (
          <CIcon
            icon={ClipBoardIcon}
            onClick={() => {
              const v = currentFocusElement.value!.id;
              if (v !== undefined && v !== null) {
                copyToClipboard(
                  v as string,
                  () => Message.success("复制成功"),
                  () => Message.warning("复制失败")
                );
              }
            }}
          ></CIcon>
        );
      }

      if (showExtra === "dataSource") {
        const isSourceData = isAttrIsSourceData(
          attributeConfig.field!,
          currentFocusElement.value!
        );
        return (
          <div
            onClick={() => {
              SelectSourceDataDialogRef.value?.handleOpen(
                attributeConfig,
                isSourceData
                  ? getValueByPath(
                      currentFocusElement.value!,
                      attributeConfig.field!
                    )
                  : undefined
              );
            }}
            class={
              isSourceData && "c-bg-blue-300 c-rounded-md dark:c-bg-blue-90"
            }
          >
            <BindIcon class="c-w-5 c-h-5 dark:c-fill-white c-cursor-pointer" />
          </div>
        );
      }
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
                        return getisValueIsSourceData(attributeConfig) ? (
                          <div class="c-select-none c-cursor-pointer">
                            {getValueByPath(
                              currentFocusElement.value!,
                              attributeConfig.field!
                            ).value + ".value"}
                          </div>
                        ) : (
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
                      extra: () => (
                        <div class="c-ml-1">
                          {renderExtraWidget(attributeConfig)}
                        </div>
                      ),
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
          onRemove={({ elementAttrObj, attributeConfig }) => {
            handleSetValue(undefined, attributeConfig.field!, attributeConfig);
            sourceDataManage.removeSourceDataDepByComponentId(
              elementAttrObj.value,
              currentFocusElement.value?.id!
            );
          }}
        />
      </>
    );
  },
});

export default ElementAttribute;
