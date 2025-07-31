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
import {
  BuilderSchema,
  FormSetting,
  IElementSchema,
} from "@cgx-designer/types";
import { deepCompareAndModify, capitalizeFirstLetter } from "@cgx-designer/utils";
import {
  SourceDataItem,
  useElement,
  useFunction,
  useSourceData,
} from "@cgx-designer/hooks";
import { isEmpty } from "lodash-es";
import { Empty } from "@cgx-designer/extensions";
import { elementController } from "@cgx-designer/controller";

const ElementBuilder = defineComponent({
  props: {
    //用于给默认值的
    formData: {
      type: Object as PropType<Record<string, any>>,
      required: false,
      default: () => ({}),
    },
    elementSchemaList: {
      type: Array as PropType<IElementSchema[]>,
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
    sourceData: {
      type: Object as PropType<SourceDataItem[]>,
      required: false,
      default: () => ({}),
    },
    //此schema为上面三个配置项的总和 如果有此配置项 以此配置项为主
    builderSchema: {
      type: Object as PropType<BuilderSchema>,
      required: false,
      default: () => ({}),
    },
  },
  setup(props, { expose, slots }) {
    const Form = elementController.getElementRender("form");
    const elementManager = useElement();
    const sourceDataManager = useSourceData(elementManager);
    const functionManager = useFunction(elementManager, sourceDataManager);
    provide("elementManager", elementManager);
    provide("functionManager", functionManager);
    provide("sourceDataManager", sourceDataManager);
    //!以下正式builder逻辑，上面注入目前只是为了不报警告
    let formData = reactive(props.formData);
    const modelValue = ref<any>(null);
    provide("formData", formData);
    //表单配置
    const getFormAttrs = computed(() => {
      const { builderSchema, formSetting } = props;
      const formSettings = !isEmpty(builderSchema)
        ? builderSchema.formSetting
        : formSetting;

      return formSettings;
    });
    //元素配置
    const useElementSchemaList = computed(() => {
      return !isEmpty(props.builderSchema) &&
        Array.isArray(props.builderSchema.elementList)
        ? props.builderSchema.elementList
        : props.elementSchemaList;
    });
    //数据源
    const useSourceDataList = computed(() => {
      return !isEmpty(props.builderSchema) &&
        Array.isArray(props.builderSchema.sourceData)
        ? props.builderSchema.sourceData
        : props.sourceData;
    });
    //!一进来先赋值一遍
    sourceDataManager.setSourceData(useSourceDataList.value);
    elementManager.setElementList(useElementSchemaList.value);
    elementManager.setMode(false);
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
          onEvent["on" + capitalizeFirstLetter(item)] = (...args: any[]) =>
            functionManager.executeFunctions(formFunctionOn[item], ...args);
        });
      return { ...onEvent };
    });

    watch(
      () => useScript.value,
      () => {
        //监听脚本内容 如果有 就直接更新了
        functionManager.setJavaScriptVal(useScript.value);
      },
      { immediate: true }
    );
    const formRef = ref<any>();
    const setFormData = (data: any) => {
      deepCompareAndModify(formData, data);
    };
    const resetFormDataToEmpty = () => {
      deepCompareAndModify(formData, {});
    };
    expose({
      formRef,
      formData,
      modelValue,
      setFormData,
      resetFormDataToEmpty,
    });
    return () => (
      <>
        {useElementSchemaList.value.length || !isEmpty(slots) ? (
          <Form
            v-model={modelValue.value}
            ref={formRef}
            model={formData}
            {...getFormAttrs.value}
            {...getFormFunction.value}
          >
            {slots.before && slots.before()}
            {useElementSchemaList.value.map((elementSchema) => (
              <ElementBuilderNode elementSchema={elementSchema} />
            ))}
            {slots.default && slots.default()}
          </Form>
        ) : (
          <div class="c-h-full c-flex c-justify-center c-items-center">
            <Empty />
          </div>
        )}
      </>
    );
  },
});
export default ElementBuilder;
