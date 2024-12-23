import {
  computed,
  defineComponent,
  PropType,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import ElementBuilderNode from "./ElementBuilderNode";
import { ElEmpty, ElForm, FormInstance } from "element-plus";
import { BuilderSchema, FormSetting, IEditorElement } from "../../types";
import { deepCompareAndModify, stringFirstBigger } from "@cgx-designer/utils";
import { useElement, useFunction } from "@cgx-designer/hooks";
import { isEmpty } from "lodash";

const ElementBuilder = defineComponent({
  props: {
    //用于给默认值的
    formData: {
      type: Object as PropType<Record<string, any>>,
      required: false,
      default: () => ({}),
    },
    elementSchemaList: {
      type: Array as PropType<IEditorElement[]>,
      require: false,
      default: () => [],
    },
    formSetting: {
      type: Object as PropType<FormSetting>,
      required: false,
      default: () => ({}),
    },
    script: {
      type: String,
      required: false,
      default: "",
    },
    //此schema为上面三个配置项的总和 如果有此配置项 以此配置项为主
    builderSchema: {
      type: Object as PropType<BuilderSchema>,
      required: false,
      default: () => ({}),
    },
  },
  setup(props, { expose, slots }) {
    const elementManage = useElement();
    const functionManage = useFunction(elementManage);
    provide("elementManage", elementManage);
    provide("functionManage", functionManage);
    //!以下正式builder逻辑，上面注入目前只是为了不报警告
    let formData = reactive(props.formData);
    provide("formData", formData);
    //表单配置
    const getFormAttrs = computed(() => {
      // 用于判断用哪个
      if (!isEmpty(props.builderSchema)) {
        return {
          labelWidth: props.builderSchema.formSetting.labelWidth || undefined,
          labelPosition:
            props.builderSchema.formSetting.labelPosition || undefined,
          size: props.builderSchema.formSetting.size || undefined,
          disabled: props.builderSchema.formSetting.disabled || undefined,
        };
      }
      return {
        labelWidth: props.formSetting.labelWidth || undefined,
        labelPosition: props.formSetting.labelPosition || undefined,
        size: props.formSetting.size || undefined,
        disabled: props.formSetting.disabled || undefined,
      };
    });
    //元素配置
    const useElementSchemaList = computed(() => {
      return !isEmpty(props.builderSchema) &&
        props.builderSchema.elementList.length
        ? props.builderSchema.elementList
        : props.elementSchemaList;
    });
    //!一进来先赋值一遍
    elementManage.setElementList(useElementSchemaList.value);
    elementManage.setMode(false);
    //脚本配置
    const useScript = computed(() => {
      return props.builderSchema.script || props.script;
    });
    //获取表单的方法 事件
    const getFormFunction = computed(() => {
      const formFunctionOn = !isEmpty(props.builderSchema)
        ? props.builderSchema.formSetting.on
        : props.formSetting.on;
      const onEvent: Record<string, Function> = {};
      formFunctionOn &&
        Object.keys(formFunctionOn).forEach((item) => {
          onEvent["on" + stringFirstBigger(item)] = (...args: any[]) =>
            functionManage.executeFunctions(formFunctionOn[item], ...args);
        });
      return { ...onEvent };
    });

    watch(
      () => useScript.value,
      () => {
        //监听脚本内容 如果有 就直接更新了
        functionManage.setJavaScriptVal(useScript.value);
      },
      { immediate: true }
    );
    const formRef = ref<FormInstance>();
    const setFormData = (data: any) => {
      deepCompareAndModify(formData, data);
    };
    const resetFormDataToEmpty = () => {
      deepCompareAndModify(formData, {});
    };
    expose({
      formRef,
      formData,
      setFormData,
      resetFormDataToEmpty,
    });
    return () => {
      return (
        <>
          {useElementSchemaList.value.length || !isEmpty(slots) ? (
            <ElForm
              ref={formRef}
              model={formData}
              {...getFormAttrs.value}
              {...getFormFunction.value}
            >
              {slots.before && slots.before()}
              {useElementSchemaList.value.map((elementSchema) => {
                return (
                  <>
                    <ElementBuilderNode elementSchema={elementSchema} />
                  </>
                );
              })}
              {slots.default && slots.default()}
            </ElForm>
          ) : (
            <div class="h-full flex justify-center items-center">
              <ElEmpty description="暂无表单元素" />
            </div>
          )}
        </>
      );
    };
  },
});
export default ElementBuilder;
