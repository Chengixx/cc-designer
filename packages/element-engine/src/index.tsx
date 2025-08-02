import { ElementInstance, IElementSchema } from "@cgx-designer/types";
import {
  deepClone,
  deepCompareAndModify,
  getValueByPath,
  capitalizeFirstLetter,
} from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  toRaw,
  VNode,
  watch,
  watchEffect,
} from "vue";
import {
  ElementManage,
  FunctionManage,
  SourceDataManage,
} from "@cgx-designer/hooks";
import { isEmpty, isEqual, omit } from "lodash-es";
import { IBindSourceData, isValueIsSourceData } from "@cgx-designer/reactivity";

const ElementNode = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IElementSchema>,
      required: true,
    },
    //编辑状态还是预览状态
    isPreview: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      required: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const FormItem = elementController.getElementRender("formItem");
    const elementManager = inject("elementManager") as ElementManage;
    const functionManager = inject("functionManager") as FunctionManage;
    const sourceDataManager = inject("sourceDataManager") as SourceDataManage;
    const elementRef = ref<ElementInstance>();
    const formItemRef = ref<ElementInstance>();
    const localSchema = reactive<IElementSchema>(
      deepClone(props.elementSchema)
    );
    //格式化field
    const formatField = (field: string | IBindSourceData) => {
      if (!field) return undefined;
      const result = isValueIsSourceData(field)
        ? sourceDataManager.getSourceData((field! as IBindSourceData).value)
            .instance.value
        : field;
      return result;
    };
    //给个默认值防止拖拽模式报错
    const formData = inject("formData", reactive({})) as any;
    //用于和组件实例双向绑定的值
    //! 注意这个地方不能无脑给空了 需要获取一下是不是会有这个值
    const bindValue = ref<any>(
      props.modelValue ??
        getValueByPath(formData, formatField(localSchema.field!) ?? "")
    );

    //拖拽编辑的时候 往field后面放一个特殊的东西 用于三向绑定
    //进来就调用一次 并且后面修改elementSchema的时候，如果和localSchema相同就不调用，不然还是要调用
    const addFieldAssit = () => {
      if (
        localSchema.field &&
        typeof localSchema.field === "string" &&
        !props.isPreview
      ) {
        localSchema.field = localSchema.field + "-assit";
      }
    };
    //更新值
    const handleUpdate = (nv: any) => {
      if (isEqual(nv, bindValue.value)) return;
      //!与此同时 如果defaultValue是sourceData 也要更新source去触发对应的更新
      if (
        isValueIsSourceData(localSchema.props?.defaultValue) &&
        props.isPreview
      ) {
        sourceDataManager.setSourceDataItem(
          localSchema.props!.defaultValue.value,
          nv
        );
      }
      emit("update:modelValue", nv);
      //!要赋值表单 如果是渲染模式 就是正式的数据了 如果编辑模式 则用于三向绑定
      if (localSchema.field) {
        formData[formatField(localSchema.field!)] = nv;
      }
    };
    //监听当前的绑定的值 变了的话 要去更改
    // watch(
    //   () => bindValue.value,
    //   () => {
    //     handleUpdate(bindValue.value);
    //   }
    // );
    //初始化的时候，去赋值一下bindValue
    const initComponentInstance = (ignoreUndefined: boolean = false) => {
      if (
        typeof (localSchema.props ??= {}).defaultValue !== "undefined" ||
        ignoreUndefined
      ) {
        const localDefaultValue = isValueIsSourceData(
          localSchema.props.defaultValue
        )
          ? sourceDataManager.getSourceData(
              localSchema.props.defaultValue.value
            ).instance.value
          : localSchema.props.defaultValue;
        const defaultValue = !props.isPreview
          ? localDefaultValue
          : (formData[formatField(localSchema.field!)] ?? localDefaultValue);
        handleUpdate(deepClone(defaultValue));
      }
    };
    //任何情况下有变动 就重新赋值绑定值
    watchEffect(() => {
      //如果有modelValue 就用modelValue，说明是属性那边的 不然就用默认值的
      bindValue.value =
        props.modelValue ?? formData[formatField(localSchema.field ?? "")];
    });

    //监听json变化 json变化了 就要重新赋值的
    let tempSchema: IElementSchema | null = null;
    watch(
      () => props.elementSchema,
      (newElementSchema) => {
        if (
          !isEqual(
            omit(localSchema, "children"),
            omit(newElementSchema, "children")
          )
        ) {
          deepCompareAndModify(localSchema, deepClone(newElementSchema));
          addFieldAssit();
          //! 这里需要用localSchema 因为localSchema是响应式的 而newElementSchema不是
          const newSchema = toRaw(
            deepClone({ ...localSchema, children: undefined })
          );
          if (!isEqual(newSchema, tempSchema)) {
            const isIgnoreUndefined =
              tempSchema?.props?.defaultValue !== undefined &&
              !Object.keys(newSchema?.props ?? {}).includes("defaultValue");
            tempSchema = newSchema;
            initComponentInstance(isIgnoreUndefined);
          }
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    //给管理中传入ref实例
    const handleAddElementInstance = () => {
      const instance = elementRef.value as ElementInstance;
      //如果有id 说明是主要的 而且有实例 就放进去
      if (localSchema.id && instance) {
        // 添加属性设置方法
        instance.setAttr = (key: string, value: any) =>
          ((localSchema.props ??= {})[key] = value);

        instance.getAttr = (key: string) => localSchema.props?.[key];
        //如果是表单组件 把输入值和获取值方法也放一下
        if (localSchema.formItem) {
          instance.setValue = handleUpdate;
          instance.getValue = () =>
            formData[formatField(localSchema.field!)] ||
            (props.modelValue ??
              getValueByPath(formData, formatField(localSchema.field!) ?? ""));
        }

        elementManager.addElementInstance(localSchema.id, instance);
        if (
          formItemRef.value &&
          localSchema.formItem &&
          !!!localSchema.noShowFormItem
        ) {
          elementManager.addElementInstance(
            localSchema.id + "-form-item",
            formItemRef.value!
          );
        }
      }
    };
    //给管理中删除ref实例
    const handleRemoveElementInstance = () => {
      if (localSchema.id) {
        elementManager.deleteElementInstance(localSchema.id);
        if (localSchema.formItem && !!!localSchema.noShowFormItem) {
          elementManager.deleteElementInstance(localSchema.id + "-form-item");
        }
      }
    };
    //获取组件的props(传递这里过去的话会方便很多)
    const getElementProps = computed(() => {
      const props = { ...localSchema.props };
      if (props) {
        Object.keys(props).forEach((key) => {
          if (typeof props[key] === "object") {
            props[key] = deepClone(props[key]);
          }
          if (isValueIsSourceData(props[key])) {
            const sourceData = sourceDataManager.getSourceData(props[key].value)
              .instance.value;
            props[key] = sourceData;
          }
        });
      }
      return props;
    });
    //获取组件的方法 事件
    const getElementFunction = computed(() => {
      //如果是编辑模式 就不添加事件
      if (!props.isPreview) return {};
      const onEvent: Record<string, Function> = {};
      localSchema.on &&
        Object.keys(localSchema.on).forEach((item) => {
          onEvent["on" + capitalizeFirstLetter(item)] = (...args: any[]) =>
            functionManager.executeFunctions(localSchema.on[item], ...args);
        });
      return { ...onEvent };
    });
    //获取组件的bindValue（怎么绑定的）
    const getElementModel = computed(() => {
      if (!!!props.elementSchema.container) {
        return {
          modelValue:
            bindValue.value ?? props.elementSchema.props?.defaultValue,
          "onUpdate:modelValue": handleUpdate,
        };
      }
      if (props.elementSchema.container) {
        return undefined;
      }
    });
    //获取组件的样式(style)
    const getElementStyle = computed(() => {
      if (localSchema.style && !isEmpty(localSchema.style)) {
        return { style: { ...localSchema.style } };
      }
      return undefined;
    });
    watch(() => elementRef.value, handleAddElementInstance, {
      immediate: true,
    });
    //获取组件外壳（目前一般就是formItem）的属性
    const getElementShellAttr = computed(() => {
      return {
        for: "-",
        label: !!getElementProps.value.label
          ? getElementProps.value.label
          : localSchema.key,
        labelPosition: getElementProps.value.labelPosition,
        prop: formatField(localSchema.field!),
        rules: localSchema.rules,
      };
    });
    onMounted(initComponentInstance);
    onUnmounted(handleRemoveElementInstance);

    //组件的外层
    const ElementShell = (children: VNode) => (
      <>
        {localSchema.formItem && !!!localSchema.noShowFormItem ? (
          <FormItem
            {...getElementShellAttr.value}
            ref={formItemRef}
            class="c-w-full"
            rules={localSchema.rules}
          >
            {children}
          </FormItem>
        ) : (
          <>{children}</>
        )}
      </>
    );
    //渲染出来的组件
    const ElementRender = elementController.elementRenderMap[localSchema.key];
    return () => (
      <>
        {ElementShell(
          <ElementRender
            ref={elementRef}
            {...getElementFunction.value}
            {...getElementModel.value}
            {...getElementStyle.value}
            {...getElementProps.value}
            elementSchema={localSchema}
          >
            {{
              // 这个是普通的插槽,就是给他一个个循环出来就好了不用过多的操作
              node: (childElementSchema: IElementSchema) => (
                <ElementNode
                  elementSchema={childElementSchema}
                  isPreview={props.isPreview}
                />
              ),
              //这个是拖拽的插槽，应该要用draggle,这里会提供一个插槽 到外面如果需要拖拽的话 是用插槽穿进来的
              editNode: () => <>{slots.editNode ? slots.editNode() : null}</>,
            }}
          </ElementRender>
        )}
      </>
    );
  },
});

export default ElementNode;
