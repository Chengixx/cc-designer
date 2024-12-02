import { ElementInstance, IEditorElement } from "../../types";
import {
  deepClone,
  deepCompareAndModify,
  stringFirstBigger,
} from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { ElFormItem } from "element-plus";
import {
  ComponentPublicInstance,
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  toRaw,
  watch,
  watchEffect,
} from "vue";
import { ElementManage, FunctionManage } from "@cgx-designer/hooks";
import { isEmpty, isEqual, omit } from "lodash";

const ElementNode = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      required: true,
    },
    //编辑状态还是预览状态
    isPreview: {
      type: Boolean,
      default: false,
    },
    provideValue: {
      required: false,
    },
  },
  emits: ["updateProvideValue"],
  setup(props, { slots, emit }) {
    const elementManage = inject("elementManage") as ElementManage;
    const functionManage = inject("functionManage") as FunctionManage;
    const elementRef = ref<ComponentPublicInstance>();
    const formItemRef = ref<ComponentPublicInstance>();
    const localSchema = reactive<IEditorElement>(
      deepClone(props.elementSchema)
    );
    //给个默认值防止拖拽模式报错
    const formData = inject("formData", reactive({})) as any;
    //用于和组件实例双向绑定的值
    const bindValue = ref<any>(props.provideValue ?? null);
    //拖拽编辑的时候 往field后面放一个特殊的东西 用于三向绑定
    //进来就调用一次 并且后面修改elementSchema的时候，如果和localSchema相同就不调用，不然还是要调用
    const addFieldAssit = () => {
      if (props.isPreview) {
        return;
      }
      if (localSchema.field && typeof localSchema.field === "string") {
        localSchema.field = localSchema.field + "-assit";
      }
    };
    addFieldAssit();
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
        }
      },
      {
        deep: true,
      }
    );
    //更新值
    const handleUpdate = (nv: any) => {
      emit("updateProvideValue", nv);
      //!要赋值表单 如果是渲染模式 就是正式的数据了 如果编辑模式 则用于三向绑定
      if (localSchema.field) {
        formData[localSchema.field!] = nv;
      }
    };
    //监听当前的绑定的值 变了的话 要去更改
    watch(
      () => bindValue.value,
      () => {
        handleUpdate(bindValue.value);
      }
    );
    //初始化的时候，去赋值一下bindValue
    const initComponentInstance = () => {
      if (typeof localSchema.props!.defaultValue !== "undefined") {
        const defaultValue = !props.isPreview
          ? localSchema.props!.defaultValue
          : (formData[localSchema.field!] ?? localSchema.props!.defaultValue);
        handleUpdate(deepClone(defaultValue));
      }
    };
    //任何情况下有变动 就重新赋值绑定值
    watchEffect(() => {
      //如果有provideValue 就用provideValue，说明是属性那边的 不然就用默认值的
      bindValue.value = props.provideValue ?? formData[localSchema.field ?? ""];
    });

    //监听json变化 json变化了 就要重新赋值的
    //!此处一定要用oldData保存数据 防止无限递归
    let tempSchema: IEditorElement | null = null;
    watch(
      () => localSchema,
      (nv) => {
        const newSchema = toRaw(deepClone({ ...nv, children: undefined }));
        if (!isEqual(newSchema, tempSchema)) {
          tempSchema = newSchema;
          initComponentInstance();
        }
      },
      { deep: true, immediate: true }
    );
    //给管理中传入ref实例
    const handleAddElementInstance = () => {
      const instance = elementRef.value as ElementInstance;
      //如果有id 说明是主要的 而且有实例 就放进去
      if (localSchema.id && instance) {
        // 添加属性设置方法
        instance.setAttr = (key: string, value: any) => {
          //保底机制
          if (!localSchema.props) {
            localSchema.props = {};
          }
          return (localSchema.props[key] = value);
        };

        instance.getAttr = (key: string) => {
          return localSchema.props![key];
        };
        //如果是表单组件 把输入值和获取值方法也放一下
        if (localSchema.formItem) {
          instance.setValue = handleUpdate;
          instance.getValue = () => {
            return formData[localSchema.field!] || props.provideValue;
          };
        }

        elementManage.addElementInstance(localSchema.id, instance);
        if (formItemRef.value && localSchema.formItem) {
          elementManage.addElementInstance(
            localSchema.id + "-form-item",
            formItemRef.value!
          );
        }
      }
    };
    //给管理中删除ref实例
    const handleRemoveElementInstance = () => {
      if (localSchema.id) {
        elementManage.deleteElementInstance(localSchema.id);
        if (localSchema.formItem) {
          elementManage.deleteElementInstance(localSchema.id + "-form-item");
        }
      }
    };
    //获取组件的方法 事件
    const getElementFunction = computed(() => {
      const onEvent: Record<string, Function> = {};
      localSchema.on &&
        Object.keys(localSchema.on).forEach((item) => {
          onEvent["on" + stringFirstBigger(item)] = (...args: any[]) =>
            functionManage.executeFunctions(localSchema.on[item], ...args);
        });
      return { ...onEvent };
    });
    //获取组件的bindValue（怎么绑定的）
    const getElementModel = computed(() => {
      if (!!!props.elementSchema.container) {
        return {
          modelValue: bindValue.value,
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
    onMounted(initComponentInstance);
    onUnmounted(handleRemoveElementInstance);
    return () => {
      //渲染出来的组件
      const ElementRender = elementController.elementRenderMap[localSchema.key];
      return (
        <>
          {localSchema.formItem ? (
            <ElFormItem
              for="-"
              label={
                !!localSchema.props!.label
                  ? localSchema.props!.label
                  : localSchema.key
              }
              ref={formItemRef}
              class="w-full"
              labelPosition={localSchema.props!.labelPosition}
              prop={localSchema.field}
              rules={localSchema.rules}
            >
              <ElementRender
                ref={elementRef}
                {...getElementFunction.value}
                {...getElementModel.value}
                {...getElementStyle.value}
                elementSchema={localSchema}
              />
            </ElFormItem>
          ) : (
            <>
              <ElementRender
                ref={elementRef}
                {...getElementFunction.value}
                {...getElementModel.value}
                {...getElementStyle.value}
                elementSchema={localSchema}
              >
                {{
                  // 这个是普通的插槽,就是给他一个个循环出来就好了不用过多的操作
                  node: (childElementSchema: IEditorElement) => {
                    return (
                      <ElementNode
                        elementSchema={childElementSchema}
                        isPreview={props.isPreview}
                      />
                    );
                  },
                  //这个是拖拽的插槽，应该要用draggle,这里会提供一个插槽 到外面如果需要拖拽的话 是用插槽穿进来的
                  editNode: () => {
                    return <>{slots.editNode ? slots.editNode() : null}</>;
                  },
                }}
              </ElementRender>
            </>
          )}
        </>
      );
    };
  },
});

export default ElementNode;
